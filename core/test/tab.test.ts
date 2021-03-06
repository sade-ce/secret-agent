import { Helpers } from '@secret-agent/testing';
import { InteractionCommand } from '@secret-agent/core-interfaces/IInteractions';
import Core from '../index';

let koaServer;
beforeAll(async () => {
  await Core.prewarm();
  koaServer = await Helpers.runKoaServer();
});
afterAll(Helpers.afterAll);
afterEach(Helpers.afterEach);

describe('basic Tab tests', () => {
  it('waits for an element', async () => {
    koaServer.get('/test1', ctx => {
      ctx.body = `<body>
<script>
    setTimeout(function() {
      const elem = document.createElement('A');
      elem.setAttribute('href', '/test2');
      document.body.append(elem)
    }, 500);
</script>
</body>`;
    });
    const meta = await Core.createTab();
    const core = Core.byTabId[meta.tabId];
    await core.goto(`${koaServer.baseUrl}/test1`);

    await expect(core.waitForElement(['document', ['querySelector', 'a']])).resolves.toBe(
      undefined,
    );
  });

  it('times out waiting for an element', async () => {
    koaServer.get('/test2', ctx => {
      ctx.body = `<body><a>Nothing really here</a></body>`;
    });
    const meta = await Core.createTab();
    const core = Core.byTabId[meta.tabId];
    await core.goto(`${koaServer.baseUrl}/test2`);

    await expect(
      core.waitForElement(['document', ['querySelector', 'a#notthere']], { timeoutMs: 500 }),
    ).rejects.toThrowError(/Timeout waiting for element .* to be visible/);
  });

  it('will wait for an element to be visible', async () => {
    koaServer.get('/test3', ctx => {
      ctx.body = `<body>
    <a id="waitToShow" href="/anywhere" style="display: none">Link</a>
<script>
    setTimeout(function() {
      document.querySelector('a#waitToShow').style.display = 'block';
    }, 150);
</script>
</body>`;
    });
    const meta = await Core.createTab();
    const core = Core.byTabId[meta.tabId];
    await core.goto(`${koaServer.baseUrl}/test3`);

    await expect(
      core.waitForElement(['document', ['querySelector', 'a#waitToShow']], {
        waitForVisible: true,
      }),
    ).resolves.toBe(undefined);
  });

  it('can wait for another tab', async () => {
    let useragent1: string;
    let useragent2: string;
    koaServer.get('/tabTest', ctx => {
      useragent1 = ctx.get('user-agent');
      ctx.body = `<body>
<a target="_blank" href="/tabTestDest">Nothing really here</a>
</body>`;
    });
    koaServer.get('/tabTestDest', ctx => {
      useragent2 = ctx.get('user-agent');
      ctx.body = `<body><h1 id="newTabHeader">You are here</h1></body>`;
    });
    const meta = await Core.createTab();
    const core = Core.byTabId[meta.tabId];
    await core.goto(`${koaServer.baseUrl}/tabTest`);
    await core.interact([
      {
        command: InteractionCommand.click,
        mousePosition: ['window', 'document', ['querySelector', 'a']],
      },
    ]);

    // @ts-ignore
    const session = core.session;

    const newTab = await core.waitForNewTab();
    const newTabCore = Core.byTabId[newTab.tabId];
    expect(newTab).toBeTruthy();
    expect(session.tabs).toHaveLength(2);
    await newTabCore.waitForLoad('AllContentLoaded');
    const header = await newTabCore.execJsPath([
      'document',
      ['querySelector', '#newTabHeader'],
      'textContent',
    ]);
    expect(header.value).toBe('You are here');
    expect(useragent1).toBe(useragent2);
    await newTabCore.closeTab();
  });
});
