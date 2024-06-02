# Developer Diary

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
      - entfernen
      - herunter laden


## Morgen zu erledigen

- artistForm
  - Bild speichern
- Artwork / Artist
  - generell: Attachments (Bilder und Dokumente) wie stelle ich die vernünftig dar?

- DatabasePouchDBAdapter
  - test: Für einen Production build (npm run package) funktioniert die lokale Datenbank noch nicht?
  - test Es wird keine Datenbank erzeugt, und auch keine Daten angelegt?
  - Info: die Datenbank ist da, un gefüllt.

## Demnächst zu erledigen

Lose Sammlung, was mir auffällt.

- AttachmentMeta könnte auch die Exifs der Bilder speichern.
- AttachmentMeta - id / key: nur eins davon verwenden (key - wegen React)

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
  - Tags-List -> sollte den Tree anzeigen.
  
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

- https://www.electronjs.org/de/docs/latest/tutorial/devtools-extension