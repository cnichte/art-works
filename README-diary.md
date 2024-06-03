# Developer Diary

- List <https://ant.design/components/list> kann `load more`! und `cards` statt Tabelle lieber das nehmen?
- react drag and drop reorder list (für Zusammenstellungen).
  - <https://github.com/react-dnd/react-dnd/>
  - <https://github.com/VaishakVk/react-drag-reorder>
  - <https://medium.com/nerd-for-tech/simple-drag-and-drop-in-react-without-an-external-library-ebf1c1b809e>
  - <https://github.com/coopercodes/ReactDndKitList>
    - <https://www.youtube.com/watch?v=Z8RoA_YSGDQ>

- Electron config Library: <https://github.com/alex8088/electron-conf>
- Ein Starter: <https://github.com/alex8088/quick-start>
  - <https://github.com/alex8088/quick-start/tree/master/packages/create-electron/playground/react>
  - macht builds für verschiedene Plattformen.

Artwork - Preis: Ein Preis kann sich auf eine Kalkulation beziehen.

## Erledigt

- 2024-05-30 Donnerstag
  - myBasicView
    - Liste in Description rendern, siehe editionView.
    - markdown rendern

- 2024-05-31 Freitag
  - myBasicView / myBasicList
    - uuid lookup repariert
    - Each child in a list should have a unique "key" prop.
  - artworkForm
    - AttachmentMeta funktioniert.

- 2024-06-01 Samstag
  - artworkForm
    - AttachmentMeta und die Actions im Backend verwenden um Attachments
      - mehrere hochladen (wird direkt im doc gemacht)

- 2024-06-02 Sonntag
  - artworkForm / myAttachmentMetaInput / View
    - große Bilder hochladen bis 50MB.
    - Verkleinertes Vorschaubild erzeugen
    - Metadaten ändern (unfertig)
    - entfernen (unfertig)
    - herunterladen (unfertig)
  - ContentSecurityPolicy
  - Fenstergröße

- 2024-06-03 Montag
  - Markierungen: rating, color, flag.
  - artworkForm / myAttachmentMetaInput / View
    - Metadaten ändern

- 2024-06-04 Dienstag
  - artworkForm / myAttachmentMetaInput / View
    - Attachment entfernen (unfertig)
    - Attachment herunterladen (unfertig)

## Morgen zu erledigen

- artworkForm / myTagsInput
  - myTagsInput: Cascader verwenden <https://ant.design/components/cascader>?
  - statt Option group? <https://ant.design/components/select>
    - suche ans laufen bringen

- artistForm
  - Bild speichern.

- DatabasePouchDBAdapter
  - test: Für einen Production build (npm run package) funktioniert die lokale Datenbank noch nicht?
  - test Es wird keine Datenbank erzeugt, und auch keine Daten angelegt?
  - Info: die Datenbank ist da, un gefüllt.

## Demnächst zu erledigen

Lose Sammlung, was mir auffällt.

- AttachmentMeta könnte auch die Exifs der Bilder speichern.
- AttachmentMeta - id / key: nur eins davon verwenden: id --- und für react: key={id}

- Artist
  - Lebenslauf Einträge hinzufügen / bearbeiten / löschen.

- Address
  - View Geburtstag wird nicht schön gerendert.
  - Kontakt bearbeiten
    - Fotoakademie Köln: Geburtstag invalid
    - Joachim Nichte - Exception... (komisches Objekt als Datum)
    - Andrea Schwelle - klappt

- Calculation
  - wie bei Editionen eine Art Tabelle machen.
  - Struktur siehe Beispiele in Datenbank (CalculationGroup, CalculationItems)

- Editionen
  - Preis-Anzahl (berechnet aus start und ende)
  - Menge (View) Edition Nummer (Form) -> Anzahl gesamt

- Rental
  - Verleih hinzufügen: Öffnet Verkauf-Form
  - Keine Beispiele in der DB? Die Liste ist noch leer.

- Settings
  - den aktiven Katalog markieren
  - Umschaltung persistent machen
  - Header-Überschrift anpassen.

- Tags
  - Tag hinzufügen - Exception
  - Tag bearbeiten - die parents werden noch nicht berücksichtigt.
  - Tags-List -> Expandable Row funktioniert nicht: <https://ant.design/components/table>
  
- Whiteboard
  - tldraw - geht noch gar nicht

## Verschiedene Probleme

param sind eigentlich view_meta / list_meta

- Beim start: router.js:286 No routes matched location "/"
- mehrfache IPC-Replies
- URls in externen Browser öffnen.
- during make: (node:9129) [DEP0174] DeprecationWarning: Calling promisify on a function that returns a Promise is likely a mistake.

- Refused to load the image 'blob:<http://localhost:3000/3c611380-6977-4d5a-97ec-b086bf2ad7ba>' because it violates the following Content Security Policy directive: "default-src 'self' 'unsafe-inline' data:". Note that 'img-src' was not explicitly set, so 'default-src' is used as a fallback.
  - <https://stackoverflow.com/questions/40360109/content-security-policy-img-src-self-data>
  - <https://content-security-policy.com>

### Auch für die Boilerplate

- App signieren
- App Icon
  - <https://www.electronforge.io/guides/create-and-add-icons>
- Assets verwenden
  - tldraw Assets lokal nutzen...
  - <https://discord.com/channels/859816885297741824/1219426289681694770/1219497107811995739>
  - <https://gist.github.com/bbudd/2a246a718b7757584950b4ed98109115>

Das Kontextmenü öffnet sich nicht (um code zu analysieren)
In der ElectronReact Boilerplate konnte man das: Inspect Element, siehe:

/Users/cnichte/develop-software/03-examples/electron-react-boilerplate/src/main/menu.ts

### ContentSecurityPolicy

- <https://www.electronjs.org/docs/latest/tutorial/security>
- <https://content-security-policy.com>

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

- Markdown + Frontmatter to Json für Notizen im View rendern und fürs Formular.
  - <https://github.com/scottstanfield/markdown-to-json#readme>
    - React
    - <https://github.com/mdx-editor/editor> - der scheint gut zu sein.
    - <https://github.com/uiwjs/react-md-editor>
    - Javascript
    - <https://github.com/Ionaru/easy-markdown-editor>
    - <https://github.com/sparksuite/simplemde-markdown-editor>

- <https://github.com/ariabuckles/simple-markdown>
  - Besserer Fork: <https://github.com/quantizor/markdown-to-jsx>
- <https://github.com/markdown-it/markdown-it?tab=readme-ov-file>
- <https://github.com/remarkjs/react-markdown>

### Devtools extensions

- <https://www.electronjs.org/de/docs/latest/tutorial/devtools-extension>

### electron-forge versus electron-vite

- <https://dev.to/navdeepm20/i-killed-electro-with-webpack-guide-to-migrate-electron-forge-webpack-to-vite-3nek>
- <https://www.electronforge.io/config/plugins/vite>
-

### Provide a release und Auto Updater

- <https://www.electronforge.io/advanced/auto-update>
  - <https://github.com/electron-userland/electron-builder>

- <https://stackoverflow.com/questions/48838051/how-to-compare-application-version-to-its-github-releases>
  - das gebaute zip
  - manually add release and upload zip to the repository
  

### Custom form Items

- <https://atlassc.net/2021/06/05/create-a-custom-ant-design-form-item-component>
- ... und Markdwon Editor einbinden:
- <https://medium.com/swlh/use-custom-and-third-party-react-form-components-with-ant-design-and-typescript-2732e7849aee>