# What needs to be done

## Erledigt

* 2024-05-30 Donnerstag
  
  * myBasicView
    * Liste in Description rendern, siehe editionView.
    * markdown rendern

* 2024-05-31 Freitag
  
  * myBasicView / myBasicList
    * uuid lookup repariert
    * Each child in a list should have a unique "key" prop.
  * artworkForm
    * AttachmentMeta funktioniert.

* 2024-06-01 Samstag
  
  * artworkForm
    * AttachmentMeta und die Actions im Backend verwenden um Attachments
      * mehrere hochladen (wird direkt im doc gemacht)

* 2024-06-02 Sonntag
  
  * artworkForm / myAttachmentMetaInput / View
    * große Bilder hochladen bis 50MB.
    * Verkleinertes Vorschaubild erzeugen
    * Metadaten ändern (unfertig)
    * entfernen (unfertig)
    * herunterladen (unfertig)
  * ContentSecurityPolicy
  * Fenstergröße

* 2024-06-03 Montag
  
  * Markierungen: rating, color, flag.
  
  * artworkForm / myAttachmentMetaInput / View
    * Attachment-Metadaten ändern
  
  * calculationForm / wditionForm
    * uuid ergänzt. Laden und speichern klappt jetzt.

* 2024-06-04 Dienstag

  * App-Icon (Mac:getestet, Linux:ungetestet, Windows:ungetestet)
  * AboutMe Dialog customized
  * Es gibt jetzt ein Custom-Menü, mit Inspect-Element Kontextmenü im Developer-Mode.
  * AttachmentMeta - Kategorie: `Werk`, `Dokument` eingeführt.
    * Das sollte helfen die zwei grundlegenden Arten zu unterscheiden.
  * arworkList - Cover-Image wird angezeigt.
  * arworkView / myBasicView
    * Tags- & Genres-Relationen werden wieder aufgelöst und angezeigt.
    * Cover-Images werden angezeigt
  
  * 2024-06-05 Mittwoch

  * artworkView
    * Condition arbeitet jetzt mit Childs (um Attachments zwischen Werk-Bildern und Dokumenten zu unterscheiden)
  * artworkForm / myAttachmentMetaInput / View
    * Attachment herunterladen.
    * Attachment entfernen
    * Generischen Tag Input

* 2024-06-05 Donnerstag

  * artworkView
    * Tags im View als echte Tags rendern.
    * <https://4x-ant-design.antgroup.com/components/tag/>

  * artworkForm
    * Artwork-Preis: Ein Preis kann sich auf eine Kalkulation beziehen...
    * Das Feld Künstler fehlt noch.
    * Genre - da wird die uuid angezeigt. Da fehlt noch die select box.
    * Generisches Tag Feld überall einbauen.

Bild entfernen - Die Änderung wird erst wirksam wenn du das Werk speicherst.

* 2024-08-10 Samstag (die gesamten letzten Woche)
  * Umbau auf Header-Buttons abgeschlossen.
  * Whiteboard: integration funktioniert.

---

## Heute

* 2024-08-11 Sonntag

---

## Als nächstes

* Rental
  * da geht noch nix
* artworkForm / myAttachmentMetaInput
  * Der Coverbild Button funktioniert noch nicht. Man muss immer über das Formular gehen.
  * Beim löschen verschwindet das Bild nicht sofort aus der Sicht (man muss redraw erst anderweitig triggern)

  * Kalkulation
    * Position: Menge (Stunden / Stück / km) - Studensatz / Reisekosten
    * Feld Gesamt Summe (automatisch berechnen)
    * Wie ist das mit der Steuer? Mehrwertsteuer / Umsatzsteuer.

## Demnächst zu erledigen

* artworkView
  * Erstellungsdatum rendern
  * Markierungen rendern

* artistForm
  * Bild speichern.

* DatabasePouchDBAdapter
  * test: Für einen Production build (npm run package) funktioniert die lokale Datenbank noch nicht?
  * test Es wird keine Datenbank erzeugt, und auch keine Daten angelegt?
  * Info: die Datenbank ist da, un gefüllt.

## Backlog

Lose Sammlung, was mir auffällt.

* Generell / alle Module
  * Übersetzung / Internationalisierung mit i18n.
  * `useContext(App_Context)` bzw `artworks_context` überall entfernen. Nutze ich nicht mehr.
  * Umgang mit Datenbank-Konflikten

---

* AttachmentMeta könnte auch die Exifs der Bilder speichern.
* AttachmentMeta - id / key: nur eins davon verwenden: id --- und für react: key={id}

* Arwork
  * ERROR: Attachments add doesnt work any more.
  * Medium: Malerei, Druckgraphik, Skulptur, Digitale Fotografie.
  * Materialien: Öle, Acryl, Tinten, Ton. Bronze, Holz, Porzellan / Keramik, Stahl, Sonstige Materialien.

Digital, Papier, Leinwand, Gips, Mixed-Media.
Abmessungen: x,y,z pixel, mm, cm

* Artist
  * Lebenslauf Einträge hinzufügen / bearbeiten / löschen.

* Address
  * View Geburtstag wird nicht schön gerendert.
  * Kontakt bearbeiten
    * Fotoakademie Köln: Geburtstag invalid
    * Joachim Nichte - Exception... (komisches Objekt als Datum)
    * Andrea Schwelle - klappt

* Calculation
  * CalculationGroup, CalculationItems brauch ich nicht mehr? Evtl. für Vorlagen?
  * Unterpositionen in Positionen, die aber in der Ausgabe nicht gezeigt werden.
    * ...

* Catalog
  * ERROR: Catalog Umschaltung funktioniert nicht mehr - plugin?.
  * Export/Import - unfertig.

* Editionen
  * Preis-Anzahl (berechnet aus start und ende)
  * Menge (View) Edition Nummer (Form) -> Anzahl gesamt
  * Es ist noch nicht klar wie die Editionen mit den Sales verknüpft sind...
    * Editionen sind ja erst mal nur eine Art Vorlage / Definition.

* Firststart
  * unfertig

* Rental
  * Verleih hinzufügen: Öffnet Verkauf-Form
  * Keine Beispiele in der DB? Die Liste ist noch leer.

* Sale
  * Da müssen die Nutzungrechte angehängt werden können.
  * Preis aus einer Kalkulation übernehmen.
  * In Form fehlt der Kunde noch (Auswahl aus Adressen)  

* Settings
  * den aktiven Katalog markieren
  * Umschaltung persistent machen
  * Header-Überschrift anpassen.

* Tags
  * Tag hinzufügen - Exception
  * Tag bearbeiten - die parents werden noch nicht berücksichtigt.
  * Tags-List -> Expandable Row funktioniert nicht: <https://ant.design/components/table>
  
* Whiteboard
  * rename board
  * preview image
  * have all tldraw assets local
  * insert imgages from Art.Works! App
  * tldraw: Maßstab / Größenangaben in `mm` oder `m`
