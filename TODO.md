# What needs to be done

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

---

## Heute

* 2024-08-13 Dienstag

  * Arwork
    -[ ] ERROR: Attachments add doesnt work any more.

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
  -[ ] `useContext(App_Context)` bzw `artworks_context` überall entfernen. Nutze ich nicht mehr.
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
  -[ ] preview image
  -[ ] have all tldraw assets local
  -[ ] insert imgages from Art.Works! App
  -[ ] tldraw: Maßstab / Größenangaben in `mm` oder `m`
