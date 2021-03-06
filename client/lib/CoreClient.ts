import ICreateSessionOptions from "@secret-agent/core-interfaces/ICreateSessionOptions";
import ISessionMeta from "@secret-agent/core-interfaces/ISessionMeta";
import CoreCommandQueue from "./CoreCommandQueue";
import CoreTab from "./CoreTab";
import { ISecretAgentConfigureOptions } from "../interfaces/ISecretAgentClass";

export default class CoreClient {
  public readonly commandQueue: CoreCommandQueue;
  public readonly tabsById: { [tabId: string]: CoreTab } = {};
  public pipeOutgoingCommand: (
    meta: ISessionMeta | null,
    command: string,
    args: any[],
  ) => Promise<{ commandId?: number; data: any }>;

  constructor() {
    this.commandQueue = new CoreCommandQueue(null, this);
  }

  public async configure(options: Partial<ISecretAgentConfigureOptions>): Promise<void> {
    await this.commandQueue.run('configure', options);
  }

  public async createTab(options: ICreateSessionOptions): Promise<CoreTab> {
    const sessionMeta = await this.commandQueue.run<ISessionMeta>('createTab', options);
    const coreTab = new CoreTab(sessionMeta, this);
    this.tabsById[sessionMeta.tabId] = coreTab;
    return coreTab;
  }

  public async getTabsForSession(sessionId: string): Promise<CoreTab[]> {
    const tabSessions = await this.commandQueue.run<ISessionMeta[]>('getTabsForSession', sessionId);
    const coreTabs: CoreTab[] = [];
    for (const sessionMeta of tabSessions) {
      let coreTab = this.tabsById[sessionMeta.tabId];
      if (!coreTab) {
        coreTab = new CoreTab(sessionMeta, this);
        this.tabsById[sessionMeta.tabId] = coreTab;
      }
      coreTabs.push(coreTab);
    }
    return coreTabs;
  }

  public async shutdown(fatalError?: Error): Promise<void> {
    const tabIds = Object.keys(this.tabsById);
    this.commandQueue.clearPending();
    if (tabIds.length || fatalError) {
      await this.commandQueue.run('disconnect', tabIds, fatalError);
    }
    for (const tabId of tabIds) {
      delete this.tabsById[tabId];
    }
  }

  public async logUnhandledError(error: Error): Promise<void> {
    await this.commandQueue.run('logUnhandledError', error);
  }

  public async prewarm(options?: Partial<ISecretAgentConfigureOptions>): Promise<void> {
    await this.commandQueue.run('prewarm', options);
  }

  public pipeIncomingEvent(meta: ISessionMeta, listenerId: string, eventData: any): void {
    this.tabsById[meta.tabId].eventHeap.incomingEvent(meta, listenerId, eventData);
  }
}
