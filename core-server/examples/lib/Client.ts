import RemoteClient from '@secret-agent/remote-client';
import JsonSocket from 'json-socket';
import Net from 'net';
import ISecretAgentClass from '@secret-agent/client/interfaces/ISecretAgentClass';

export default class SecretAgentSocketClient {
  public remoteClient: RemoteClient;
  public SecretAgent: ISecretAgentClass;
  private readonly port: number;
  private netSocket: Net.Socket;
  private isOpen = false;

  constructor(config: { ip?: string; port: number }) {
    this.port = config.port;
    this.remoteClient = new RemoteClient();
    this.SecretAgent = this.remoteClient.SecretAgent;
    this.bindPipes();
  }

  public close() {
    this.isOpen = false;
    return new Promise<void>(resolve => {
      if (this.netSocket.destroyed) return resolve();
      this.netSocket.end(() => setTimeout(resolve, 0));
    });
  }

  private bindPipes() {
    this.netSocket = Net.connect({ port: this.port });

    this.netSocket.once('connect', () => {
      this.isOpen = true;
    });

    this.netSocket.once('close', () => {
      this.isOpen = false;
      this.netSocket.destroy();
    });

    const jsonSocket = new JsonSocket(this.netSocket);
    jsonSocket.on('message', payload => this.remoteClient.pipeIncoming(payload));
    this.remoteClient.pipeOutgoing(msg => (this.isOpen ? jsonSocket.sendMessage(msg) : null));
  }
}
