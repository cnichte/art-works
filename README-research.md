# Developers Research

Ich würde gern die Unterscheidung

* 'mit relational-pouch' und
* 'ohne relational-pouch'

elegant lösen und beides ganz transpartent unterstützen. Suche nach:

```js
//* PouchDB without Plugin relational-pouch
```

um einige der Code Stellen zu identifizieren.

könnte in den settings gespeichert sein, unter den Verbindungsparametern - eher ungünstig.
das wird ja zur Entwurfszeit festgelegt.

Siehe auch `src/app/common/PouchDB_Tool.ts`

## Links

* Im Header: Connected-Symbol bei Server + "Watchdog": `<CloudServerOutlined /> <CheckCircleOutlined /> <CloseCircleOutlined />`
* List <https://ant.design/components/list> kann `load more`! und `cards`
  * statt Tabelle lieber das nehmen?
  * Am  besten mal alle drei Optionen implementieren. Den Umschalter gibts ja schon in 2fach.
* react drag and drop reorder list (für Zusammenstellungen).
  * <https://github.com/react-dnd/react-dnd/>
  * <https://github.com/VaishakVk/react-drag-reorder>
  * <https://medium.com/nerd-for-tech/simple-drag-and-drop-in-react-without-an-external-library-ebf1c1b809e>
  * <https://github.com/coopercodes/ReactDndKitList>
    * <https://www.youtube.com/watch?v=Z8RoA_YSGDQ>

* Electron config Library: <https://github.com/alex8088/electron-conf>
* Ein Starter: <https://github.com/alex8088/quick-start>
  * <https://github.com/alex8088/quick-start/tree/master/packages/create-electron/playground/react>
  * macht builds für verschiedene Plattformen.

* Ein Modul Recherche / Eine Art modulübergreifende Suche.
  * Macht das Sinn?
  * Man könnte darin suchen "abspeichern". Das wäre wie spezielle Views anlegen.
  * Die könnte ich schon im vorhandenen Input-search field implementieren.
    * Option: im aktuellen Modul suchen / in allen Modulen suchen.
    * Das Suchergebnis öffnet sich dann in einem Fenster mit vorschauen.
    * die Ergenbisse verlinken uaf die Einträge in den Modulen.
    * Das blöde ist das die Ergebnisse weg sin sobald sich das fenter schließt.
    * Vielleicht was für den Drawer?
      * Der müsste nur übergreifend implemetiert sein.

* DATABASE
  * beim Befüllen der DB über json, sollen auch die attachments geladen werden.
  * Es wäre an der Zeit den db inhalt zu exportieren und wieder zu importieren.
  * TESTEN: Liste der letzten Änderungen: <https://gist.github.com/nolanlawson/7c32861af5d31a8fac4a>

* Electron - Öffne einen Link im externen Browser...
  * <https://gist.github.com/luizcarraro/2d04d83e66e3f03bef9b2e714ea8c0d7>
  * In dem Zusammenhang
  * <https://www.electronjs.org/de/docs/latest/tutorial/launch-app-from-url-in-another-app>
  * electron-fiddle://

* Baue die App auf meinem
  * alten Laptop Mac, Linux - VirtualBox / UTM
  * Arbeits-Laptop - Windows

* WHITEBOARD
  * <https://www.geeksforgeeks.org/how-to-take-screenshots-in-electronjs/>
  * Ich habs heute zufällig gessehen in meiner App (siehe Screenshot)...
  * Bring das Ding ans laufen!
  * Building assets <https://gist.github.com/bbudd/2a246a718b7757584950b4ed98109115>
  * <https://stackoverflow.com/questions/60839621/cant-use-static-files-in-electron-forge>
* <https://github.com/electron/forge/issues/1592> Provide an example of serving static files

// STATIC_ASSETS:
Assets für TLDRAW
<https://stackoverflow.com/questions/60839621/cant-use-static-files-in-electron-forge>
<https://www.electronforge.io/config/configuration>

Hi, i am a newbie writing a fancy Electron-App, using electron-forge, React + andt. I try to integrate tldraw into it and it looks like this. I added <https://unpkg.com> to the 'img-src' Content-Security-Policy in index.html and in forge.config.ts 'devContentSecurityPolicy' to get it up runnig like so. That's a good start. But I would like to store the assets locally, and that doesn't work at all. Is there an example of how to implement this?

Save and load
<https://tldraw.dev/docs/persistence>


## Verschiedene Probleme

param sind eigentlich view_meta / list_meta

* Beim start: router.js:286 No routes matched location "/"
* mehrfache IPC-Replies
* URls in externen Browser öffnen.
* during make: (node:9129) [DEP0174] DeprecationWarning: Calling promisify on a function that returns a Promise is likely a mistake.

* Refused to load the image 'blob:<http://localhost:3000/3c611380-6977-4d5a-97ec-b086bf2ad7ba>' because it violates the following Content Security Policy directive: "default-src 'self' 'unsafe-inline' data:". Note that 'img-src' was not explicitly set, so 'default-src' is used as a fallback.
  * <https://stackoverflow.com/questions/40360109/content-security-policy-img-src-self-data>
  * <https://content-security-policy.com>

### Auch für die Boilerplate

* App signieren
* App Icon
  * <https://www.electronforge.io/guides/create-and-add-icons>
* Assets verwenden
  * tldraw Assets lokal nutzen...
  * <https://discord.com/channels/859816885297741824/1219426289681694770/1219497107811995739>
  * <https://gist.github.com/bbudd/2a246a718b7757584950b4ed98109115>

Das Kontextmenü öffnet sich nicht (um code zu analysieren)
In der ElectronReact Boilerplate konnte man das: Inspect Element, siehe:

/Users/cnichte/develop-software/03-examples/electron-react-boilerplate/src/main/menu.ts

### ContentSecurityPolicy

* <https://www.electronjs.org/docs/latest/tutorial/security>
* <https://content-security-policy.com>

Lösung:

1. <https://stackoverflow.com/questions/69790650/contentsecuritypolicy-preventing-fetch-request-in-electron>
2. <https://www.electronforge.io/config/plugins/webpack>

Siehe einmal in Datei `src/index.html`, und für die Entwicklung in Datei `forge.config.ts`:

`devContentSecurityPolicy` aus 1:

```js
{ 
  devContentSecurityPolicy: 'default-src \'self\' \'unsafe-inline\' data:; script-src \'self\' \'unsafe-eval\' \'unsafe-inline\' data:`' 
}
```

`devContentSecurityPolicy` aus 2:

```js
{ 
  devContentSecurityPolicy:  'default-src * self blob: data: gap:; style-src * self \'unsafe-inline\' blob: data: gap:; script-src * \'self\' \'unsafe-eval\' \'unsafe-inline\' blob: data: gap:; object-src * \'self\' blob: data: gap:; img-src * self \'unsafe-inline\' blob: data: gap:; connect-src self * \'unsafe-inline\' blob: data: gap:; frame-src * self blob: data: gap:;' 
}
```

aus 2, ohne die `\`:

```text
default-src * self blob: data: gap:;
style-src * self 'unsafe-inline' blob: data: gap:;
script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:;
object-src * 'self' blob: data: gap:;
img-src * self 'unsafe-inline' blob: data: gap:;
connect-src self * 'unsafe-inline' blob: data: gap:;
frame-src * self blob: data: gap:;
```

2 hab ich getestet, und die Vorschaubilder beim Upload werden geladen.

## Recherchen

* Markdown + Frontmatter to Json für Notizen im View rendern und fürs Formular.
  * <https://github.com/scottstanfield/markdown-to-json#readme>
    * React
    * <https://github.com/mdx-editor/editor> - der scheint gut zu sein.
    * <https://github.com/uiwjs/react-md-editor>
    * Javascript
    * <https://github.com/Ionaru/easy-markdown-editor>
    * <https://github.com/sparksuite/simplemde-markdown-editor>

* <https://github.com/ariabuckles/simple-markdown>
  * Besserer Fork: <https://github.com/quantizor/markdown-to-jsx>
* <https://github.com/markdown-it/markdown-it?tab=readme-ov-file>
* <https://github.com/remarkjs/react-markdown>

### Devtools extensions

* <https://www.electronjs.org/de/docs/latest/tutorial/devtools-extension>

### electron-forge versus electron-vite

* <https://dev.to/navdeepm20/i-killed-electro-with-webpack-guide-to-migrate-electron-forge-webpack-to-vite-3nek>
* <https://www.electronforge.io/config/plugins/vite>

### Provide a release und Auto Updater

* <https://www.electronforge.io/advanced/auto-update>
  * <https://github.com/electron-userland/electron-builder>

* <https://stackoverflow.com/questions/48838051/how-to-compare-application-version-to-its-github-releases>
  * das gebaute zip
  * manually add release and upload zip to the repository
  
### Custom form Items

* <https://atlassc.net/2021/06/05/create-a-custom-ant-design-form-item-component>
* ... und Markdwon Editor einbinden:
* <https://medium.com/swlh/use-custom-and-third-party-react-form-components-with-ant-design-and-typescript-2732e7849aee>

## HOW TO HANDLE STATIC ASSETS

### Möglichkeit 1

* <https://stackoverflow.com/questions/60839621/cant-use-static-files-in-electron-forge>

```html
<img src='static://assets/images/a.png'/>
```

`main.ts`

```ts
import { session } from "electron";
import path from 'path';

app.on('ready', () => {
  // Customize protocol to handle static resource.
  // Register a protocol named static, and use static:// as the prefix of you image resources later.
  session.defaultSession.protocol.registerFileProtocol('static', (request:any, callback:any) => {
    const fileUrl = request.url.replace('static://', '');
    const filePath = path.join(app.getAppPath(), '.webpack/renderer', fileUrl);
    callback(filePath);
  });

  createWindow();
});
```

`webpack.plugins.ts`

```ts
import CopyWebpackPlugin from 'copy-webpack-plugin';

import path from 'path';
const assets = [ 'assets' ];

  // STATIC_ASSETS:
  // https://nodejs.org/api/path.html#pathresolvepaths
  // __dirname absolute path of the directory containing the currently executing file.
  new CopyWebpackPlugin(
    {
      patterns: assets.map((asset) => ({
        from: path.resolve(__dirname, 'src', asset),
        to: path.resolve(__dirname, '.webpack/renderer', asset)
      }))
    }),
```

`forge.config.ts`

```js
"devContentSecurityPolicy": "default-src 'self' 'unsafe-eval' 'unsafe-inline' static: http: https: ws:", // <--- this line
```
