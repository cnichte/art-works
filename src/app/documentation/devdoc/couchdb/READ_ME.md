# Developer Notes

## Probleme mit Events?

```js
const onDateModeEvent = (e: RadioChangeEvent) => {
    const { target } = e; //* type guard
    const element = target as HTMLButtonElement;
    if (target) console.log(element.value);
}
```



electron-forge versus <https://electron-vite.org/>
oder gar beides? <https://www.electronforge.io/config/plugins/vite>




- `Type '{ onClick: () => void; }' is not assignable to type 'IntrinsicAttributes & Props'.`
- <https://stackoverflow.com/questions/65183883/onclick-not-assignable-to-type-intrinsicattributes-error-in-typescript-react>

## App Icon

- <https://www.electronforge.io/guides/create-and-add-icons>

## CouchDB & Pouch.db

- <https://subvisual.com/blog/posts/130-how-to-build-offline-web-applications-with-couchdb-and-pouchdb/>

Mit PouchDB können Anwendungen, Daten lokal speichern, wenn man offline ist, und sie dann mit CouchDB und kompatiblen Servern zu synchronisieren, wenn die Anwendung wieder online ist, so dass die Daten des Benutzers immer auf dem gleichen Stand sind, egal wo er sich das nächste Mal anmeldet.

- CouchDB ist nicht gut geeignet, bei vielen Usern mit unterschiedlichen Nutzungsrechten. Wo man ohne komplexe Nutzungsrechte auskommt, ist couchdb super.
- Für iOS und Android gibt es Couchbase lite: <https://github.com/couchbase>

```text
Man braucht aber keine CouchDB, um PouchDB zu benutzen !!!
```

Zwei Erkenntnisse:

- Wenn ich nur lokal als einzelner Nutz arbeite, brauche ich nur `PouchDB`.
- Auch wenn wenn ich PouchDB remote nutze, hab ich immer eine lokale Version, die sich mit dem remote server synchronisiert.

### Wo ist die lokale Datenbank, wenn man eine `remote` verwendet?

`find -name "*.couch"`

Da ist sie in macOS:

`~/Library/Application Support/CouchDB2/etc/couchdb`

<https://stackoverflow.com/questions/6301012/how-do-i-change-the-database-file-location-for-couchdb>

Da ist die local.ini Datei:

`/Users/cnichte/Library/Preferences/couchdb2-local.ini`

Eine Beispiel Datei liegt in diesem Verzeichnis.

### Wo ist die lokale Datenbank, wenn man eine `local` verwendet?

local.ini - soll für eine ausschließlich lokal genutze DB sein.

#### Dev Build

- Die DBs liegen im Arbeitsverzeichnis / Projektverzeichnis
- Wo legt man die local.ini hin?

#### Prod build

- TODO Die DBs liegen wo ????
- TODO Wo legt man die local.ini hin?
