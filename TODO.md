# What needs to be done

UPDATE

Patch   Backwards-compatible bug fixes
❯ ◉ @types/react                                 ^18.3.3  →  ^18.3.10
  ◉ @vercel/webpack-asset-relocator-loader         1.7.3  →     1.7.4
  ◉ dayjs                                       ^1.11.12  →  ^1.11.13
  ◉ mysql2                                       ^3.11.0  →   ^3.11.3
  ◉ react-router                                 ^6.26.0  →   ^6.26.2
  ◉ react-router-dom                             ^6.26.0  →   ^6.26.2

Minor   Backwards-compatible features
  ◉ @ant-design/charts                            ^2.1.2  →    ^2.2.1
  ◉ @electron-forge/cli                           ^7.4.0  →    ^7.5.0
  ◉ @electron-forge/maker-deb                     ^7.4.0  →    ^7.5.0
  ◉ @electron-forge/maker-rpm                     ^7.4.0  →    ^7.5.0
  ◉ @electron-forge/maker-squirrel                ^7.4.0  →    ^7.5.0
  ◉ @electron-forge/maker-zip                     ^7.4.0  →    ^7.5.0
  ◉ @electron-forge/plugin-auto-unpack-natives    ^7.4.0  →    ^7.5.0
  ◉ @electron-forge/plugin-fuses                  ^7.4.0  →    ^7.5.0
  ◉ @electron-forge/plugin-webpack                ^7.4.0  →    ^7.5.0
  ◉ @electron-forge/publisher-github              ^7.4.0  →    ^7.5.0
  ◉ @types/node                                  ^22.1.0  →   ^22.7.4
  ◉ antd                                         ^5.20.0  →   ^5.21.2
  ◉ antd-img-crop                                ^4.22.0  →   ^4.23.0
  ◉ electron-conf                                 ^1.1.0  →    ^1.2.1
  ◉ electron-log                                  ^5.1.7  →    ^5.2.0
  ◉ eslint-plugin-import                         ^2.29.1  →   ^2.30.0
  ◉ i18next                                     ^23.12.2  →  ^23.15.1
  ◉ markdown-to-jsx                               ^7.4.7  →    ^7.5.0
  ◉ relational-pouch                              ^4.0.4  →    ^4.1.1
  ◉ typescript                                    ~5.5.4  →    ~5.6.2

Major   Potentially breaking API changes
  ◯ @typescript-eslint/eslint-plugin             ^7.10.0  →    ^8.8.0
  ◯ @typescript-eslint/parser                    ^7.10.0  →    ^8.8.0
  ◯ electron                                      31.3.1  →    32.1.2
  ◯ eslint                                        ^8.0.1  →   ^9.11.1
  ◯ pouchdb                                       ^8.0.1  →    ^9.0.0
  ◯ pouchdb-find                                  ^8.0.1  →    ^9.0.0
  ◯ tldraw                                        ^2.4.4  →    ^3.2.0

## Verzeichnis-Struktur

Ich versuche gerade den Framework-Code vom Custom-Code zu trennen.

* /app/backend/ - main Process
* /app/common/ - von beiden genutzt
* /app/frontend/ - renderer Process

und dann in den Unterverzeichnissen jeweils:

* /custom/
* /framework/

Darunter wiederum...

im Backend jeweils:

* /tools/
* /types/

und im Frontend jeweils:

* /components/
* /tools/
* /types/

Nachteil: Der Code liegt mehr fragmentiert in verschiedenen Verzeichnissen.

## Aktuell

-[ ] App-Logo SVG im Login Screen geht noch nicht.
-[ ] Database_Pouchdb.ts unterstützt sauber "mit und ohne" relational-pouch, sowie Mischbetrieb.
  -[ ] DocUser läuft ohne relational-pouch.
  -[ ] Der Rest läuft mit relational-pouch.


Ne Inbox brauch ich nicht.
Aber den Status "Neu".

Die Bilder und Attachmemts werden neben der Datenbank abgelegt:

DAS GEHT ABER NUR BEM LOCAL-Store, der remote store muss alles in der Datenbank ablegen.

* Jedes Werk bekommt beim Import erst mal eine temporäre laufende Nummer zugeordnet: Jahr der Erfassung-Nummer.
* Die wird dann reorganisiert wenn die Daten angelegt sind.

Werknummer - Eingang

* Werkverzeichnis-Kennung (Sammlung / Katalog-Name / „cnichte“)
* jahr (erfassung)
* Lfd. Nr. (Schema „001“)
* Beispiele
  * neu-2024.15

Werknummer - vollständig

* Werkverzeichnis-Kennung (Sammlung / Katalog-Name / „cnichte“)
* Werkgruppe
* Genre
* optionaler title
* jahr (erstellung)
* Lfd. Nr. (Schema „001“)
* Beispiele
  * cnichte.generative-art.ai.2020-100
  * cnichte.photography.portait.2018-20
  * cnichte.photography.[portait,conceputual].2018-20  ???

werkverzeichnis-artist/datenbank
werkverzeichnis-artist/werke/eingang/
werkverzeichnis-artist/werke/verzeichnis/

Und darin:

/werk-a/werk-a.json
/werk-a/werk-a.md
/werk-a/Abbildungen/Werk-a-1-print.jpg
/werk-a/attachments/

Werk-a-print.jpg
Werk-a.json
Werk-a.md

## Erledigt

* 2024-05-30 Donnerstag
  
  * myBasicView
    -[x] Liste in Description rendern, siehe editionView.
    -[x] markdown rendern

* 2024-05-31 Freitag
  
  * myBasicView / myBasicList
    -[x] uuid lookup repariert
    -[x] Each child in a list should have a unique "key" prop.
  * artworkForm
    -[x] AttachmentMeta funktioniert.

* 2024-06-01 Samstag
  
  * artworkForm
    -[x] AttachmentMeta und die Actions im Backend verwenden um Attachments
      -[x] mehrere hochladen (wird direkt im doc gemacht)

* 2024-06-02 Sonntag
  
  * artworkForm / myAttachmentMetaInput / View
    -[x] große Bilder hochladen bis 50MB.
    -[x] Verkleinertes Vorschaubild erzeugen
    -[x] Metadaten ändern (unfertig)
    -[x] entfernen (unfertig)
    -[x] herunterladen (unfertig)
  -[x] ContentSecurityPolicy
  -[x] Fenstergröße

* 2024-06-03 Montag
  
  -[x] Markierungen: rating, color, flag.
  
  * artworkForm / myAttachmentMetaInput / View
    -[x] Attachment-Metadaten ändern
  
  * calculationForm / wditionForm
    -[x] uuid ergänzt. Laden und speichern klappt jetzt.

* 2024-06-04 Dienstag

  -[x] App-Icon (Mac:getestet, Linux:ungetestet, Windows:ungetestet)
  -[x] AboutMe Dialog customized
  -[x] Es gibt jetzt ein Custom-Menü, mit Inspect-Element Kontextmenü im Developer-Mode.
  -[x] AttachmentMeta - Kategorie: `Werk`, `Dokument` eingeführt. Das sollte helfen die zwei grundlegenden Arten zu unterscheiden.
  -[x] arworkList - Cover-Image wird angezeigt.
  * arworkView / myBasicView
    -[x] Tags- & Genres-Relationen werden wieder aufgelöst und angezeigt.
    -[x] Cover-Images werden angezeigt
  
  * 2024-06-05 Mittwoch

  * artworkView
    -[x] Condition arbeitet jetzt mit Childs (um Attachments zwischen Werk-Bildern und Dokumenten zu unterscheiden)
  * artworkForm / myAttachmentMetaInput / View
    -[x] Attachment herunterladen.
    -[x] Attachment entfernen
    -[x] Generischen Tag Input

* 2024-06-05 Donnerstag

  * artworkView
    -[x] Tags im View als echte Tags rendern.
    * <https://4x-ant-design.antgroup.com/components/tag/>

  * artworkForm
    -[x] Artwork-Preis: Ein Preis kann sich auf eine Kalkulation beziehen...
    -[x] Das Feld Künstler fehlt noch.
    -[x] Genre - da wird die uuid angezeigt. Da fehlt noch die select box.
    -[x] Generisches Tag Feld überall einbauen.

Bild entfernen - Die Änderung wird erst wirksam wenn du das Werk speicherst.

* 2024-08-10 Samstag (die gesamten letzten Woche)
  -[x] Umbau auf Header-Buttons abgeschlossen.
  -[x] Whiteboard: integration funktioniert.

* 2024-08-12 Montag

  * Catalog
    -[x] ERROR: Catalog Umschaltung funktioniert nicht mehr. `IPC_Request_Dispatcher` hat jetzt ein Property `useRelations`.
       -[x] Local Store: geht.
       -[x] Remote store: wird gefunden.

* 2024-08-13 Dienstag
  
  * Catalog
    -[x] Wenn ich eine neue DB anlege wird sie anstandslos geöffnet. Deshalb ist ein Backup mit Attachmnts essentiell
  * Artwork
    -[x] ERROR: Attachments add doesnt work any more.
    -[x] Tags und Multi-Selects repaired.

* 2024-08-21 Mittwoch

* List und View
    -[x] List als Table oder Grid Darstellung.
    -[x] Markdown-Links werden im externen Browser geöffnet.
* Whiteboard
  -[x] preview image
  -[x] View: my own custom renderer following the andt concept.

* 2024-08-23 Freitag

-[x] Für Segmente gibt es jetzt einen eigenen Datentyp.
-[x] Suchformular mit drei Teilen.
-[x] Versions-Nummern eingeführt. Das ist wichtig, da ich viele der Klassen in unterschiedlichen Programmen verwende:

* Basic Electron-TS-React Starter (ist die Referenz)
* Art.Works!
* DFI-Dashboard

Ich arbeite ja momentan an allen Apps mehr oder weniger gleichzeitig, und muss Änderungen an zentralen Klassen in die anderen Apps Übernehmen.
Das geht manchmal nicht zeitnah. Da hilft die Nummer ein wenig, Übersicht zu behalten welche der Dateien den aktuelleren Stand hat.

Es ist sinnvol trotzdem einen Dateivergleich mit Beyond-Compare zu machen, bzw. Änderungen zeitnah zu übernehmen.

---

## Heute

-[ ] In andere Übernehmen:

* Catalog überarbeitet
* DocCatalog
* SettingTypes
* FormTool ! (unterscheidet jetzt zwischen 'mit relational-pouch' und ohne)

  * Artwork
    -[ ] Weiter testen: Artwork-Attachments, Tags
      -[ ] nach Upload wird das Bild nicht aus der Upload liste entfernt
      -[ ] List und View soll wieder Bilder anzeigen

---

## Als nächstes

* Rental
  -[ ] da geht noch nix.
* artworkForm / myAttachmentMetaInput
  -[ ] Der Coverbild Button funktioniert noch nicht. Man muss immer über das Formular gehen.
  -[ ] Beim löschen verschwindet das Bild nicht sofort aus der Sicht (man muss redraw erst anderweitig triggern)

* Kalkulation
  -[ ] Position: Menge (Stunden / Stück / km) - Studensatz / Reisekosten
  -[ ] Feld Gesamt Summe (automatisch berechnen)
  -[ ] Wie ist das mit der Steuer? Mehrwertsteuer / Umsatzsteuer.

Drag and Drop
DnD Kit
<https://dndkit.com>

## Demnächst zu erledigen

* artworkView
  -[ ] Erstellungsdatum rendern
  -[ ] Markierungen rendern

* artistForm
  -[ ] Bild speichern.

* DatabasePouchDBAdapter
  -[ ] test: Für einen Production build (npm run package) funktioniert die lokale Datenbank noch nicht?
  -[ ] test Es wird keine Datenbank erzeugt, und auch keine Daten angelegt?
  -[ ] Info: die Datenbank ist da, ungefüllt.

## Backlog

Lose Sammlung, was mir auffällt.

* Generell / alle Module
  -[ ] Übersetzung / Internationalisierung mit i18n.
  -[x] `useContext(App_Context)` bzw `artworks_context` überall entfernen. Nutze ich nicht mehr.
  -[ ] Umgang mit Datenbank-Konflikten

---

-[ ] AttachmentMeta könnte auch die Exifs der Bilder speichern.
-[ ] AttachmentMeta - id / key: nur eins davon verwenden: id --- und für react: key={id}

* Arwork
  -[ ] Medium: Malerei, Druckgraphik, Skulptur, Digitale Fotografie.
  -[ ] Materialien: Öle, Acryl, Tinten, Ton. Bronze, Holz, Porzellan / Keramik, Stahl, Sonstige Materialien.

Digital, Papier, Leinwand, Gips, Mixed-Media.
Abmessungen: x,y,z pixel, mm, cm

* Artist
  -[ ] Lebenslauf Einträge hinzufügen / bearbeiten / löschen.

* Address
  -[ ] View Geburtstag wird nicht schön gerendert.
  * Kontakt bearbeiten
    -[ ] Fotoakademie Köln: Geburtstag invalid
    -[ ] Joachim Nichte - Exception... (komisches Objekt als Datum)
    -[ ] Andrea Schwelle - klappt

* Calculation
  -[ ] CalculationGroup, CalculationItems brauch ich nicht mehr? Evtl. für Vorlagen?
  -[ ] Unterpositionen in Positionen, die aber in der Ausgabe nicht gezeigt werden.

* Catalog
  -[ ] Export/Import - unfertig.
  -[ ] Beim Backup erstellen gibts ne Fehlermeldung. Backup ist aber da.
  -[ ] Remote store `werkverzeichnis`:
  
      * Daraus lesen geht mit der umgebauten app immer noch nicht: `find` error.
        * `pouchdb` und `find` sind aktueller.
      * Mit der alten App gibt es den Fehler nicht:
      `/Users/cnichte/develop-software/01-active/art-works-deprecated/art-works`
      * Deshalb ist backup and restore mit Attachments essentiell.

* Editionen
  -[ ] Preis-Anzahl (berechnet aus start und ende)
  -[ ] Menge (View) Edition Nummer (Form) -> Anzahl gesamt
  -[ ] Es ist noch nicht klar wie die Editionen mit den Sales verknüpft sind...
    -[ ] Editionen sind ja erst mal nur eine Art Vorlage / Definition.

* Firststart
  -[ ] unfertig

* Rental
  -[ ] Verleih hinzufügen: Öffnet Verkauf-Form
  -[ ] Keine Beispiele in der DB? Die Liste ist noch leer.

* Sale
  -[ ] Da müssen die Nutzungrechte angehängt werden können.
  -[ ] Preis aus einer Kalkulation übernehmen.
  -[ ] In Form fehlt der Kunde noch (Auswahl aus Adressen)  

* Settings
  -[ ] den aktiven Katalog markieren
  -[ ] Umschaltung persistent machen
  -[ ] Header-Überschrift anpassen.

* Tags
  -[ ] Tag hinzufügen - Exception
  -[ ] Tag bearbeiten - die parents werden noch nicht berücksichtigt.
  -[ ] Tags-List -> Expandable Row funktioniert nicht: <https://ant.design/components/table>
  
* Whiteboard
  -[ ] rename board
  -[ ] have all tldraw assets local
  -[ ] insert imgages from Art.Works! App
  -[ ] tldraw: Maßstab / Größenangaben in `mm` oder `m`
