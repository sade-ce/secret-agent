import * as fs from 'fs';
import INewDocumentInjectedScript from '@secret-agent/core-interfaces/INewDocumentInjectedScript';
import injectedSourceUrl from '@secret-agent/core-interfaces/injectedSourceUrl';

const cache: { [name: string]: string } = {};
const shouldCache = process.env.NODE_ENV === 'production';

const utilsScript = [
  fs.readFileSync(`${__dirname}/../injected-scripts/_proxyUtils.js`, 'utf8'),
  fs.readFileSync(`${__dirname}/../injected-scripts/_descriptorBuilder.js`, 'utf8'),
].join('\n');

export default class DomOverridesBuilder {
  private readonly scripts: string[] = [];

  public build(): INewDocumentInjectedScript[] {
    return [
      {
        // NOTE: don't make this async. It can cause issues if you read a frame right after creation, for instance
        script: `(function newDocumentScript() {
  const sourceUrl = '${injectedSourceUrl}';
  ${utilsScript}

   ${this.scripts.join('\n\n')}
})();
//# sourceURL=${injectedSourceUrl}`.replace(/\/\/# sourceMap.+/g, ''),
      },
    ];
  }

  public add(name: string, args: any = {}) {
    let script = cache[name];
    if (!script) {
      if (!fs.existsSync(`${__dirname}/../injected-scripts/${name}.js`)) {
        throw new Error(`Browser-Emulator injected script doesn\`t exist: ${name}`);
      }
      script = fs.readFileSync(`${__dirname}/../injected-scripts/${name}.js`, 'utf8');
    }
    if (shouldCache) cache[name] = script;

    if (name === 'errors') args.sourceUrl = injectedSourceUrl;

    let wrapper = `(function newDocumentScript_${name.replace(/\./g, '__')}(args) {
  try {
    ${script};
  } catch(err) {
    console.log('Failed to initialize "${name}"', err);
  }
})(${JSON.stringify(args)});`;

    if (name.startsWith('polyfill.')) {
      wrapper = `// if main frame and HTML element not loaded yet, give it a sec
  if (window.self === window.top && !document.documentElement) {
    new MutationObserver((list, observer) => {
      observer.disconnect();
      ${wrapper}
    }).observe(document, {childList: true, subtree: true});
  } else {
    ${wrapper}
  }
`;
    }
    this.scripts.push(wrapper);
  }
}

export function getOverrideScript(name: string, args?: any) {
  const injected = new DomOverridesBuilder();
  injected.add(name, args);
  return injected.build()[0];
}
