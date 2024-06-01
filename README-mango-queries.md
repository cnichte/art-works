# Mango Queries

- Datenbank: <http://fileserver02:5984/_utils/#login>
- user: admin, pw: adminadmin

```json
{
   "selector": {
      "data": {
         "docType": {
            "$eq": "artwork"
         }
      }
   }
}
```

```json
{
   "selector": {
      "data": {
         "docType": {
            "$eq": "address"
         }
      }
   }
}
```

```json
{
   "selector": {
      "data": {
         "docType": {
            "$eq": "groupofwork"
         }
      }
   }
}
```

Warning: [antd: Message] You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.

## List

```json
  {
      docType: 'groupofwork',
      docScope: 'user',
      title: 'Porträtskulpturen',
      description: 'Das Thema Portratitplatik',
      zeitraum_von: '2020',
      zeitraum_bis: '2022',
      note: '',
      artworks: [],
      id: '9503DA4B-1B18-7350-9B8B-DAA0BBDF2662',
      rev: '1-e4097f8eb5e9e1325b2ebf7be821c967'
    }
```

## View

```json
{
  groupsofwork: [
    {
      docType: 'groupofwork',
      docScope: 'user',
      title: 'Porträtskulpturen',
      description: 'Das Thema Portratitplatik beschäftigt mich von Zeit zu Zeit, aber leider viel zu selten. Der Prozess ist ziemlich aufwändig und mir fehlt dafür einfach eine Werkstatt.',
      zeitraum_von: '2020',
      zeitraum_bis: '2022',
      note: '',
      artworks: [],
      id: '9503DA4B-1B18-7350-9B8B-DAA0BBDF2662',
      rev: '1-e4097f8eb5e9e1325b2ebf7be821c967'
    }
  ]
}
```

## FORM

```json
{
  groupsofwork: [
    {
      docType: 'groupofwork',
      docScope: 'user',
      title: 'Porträtskulpturen',
      description: 'Das Thema Portratitplatik beschäftigt mich von Zeit zu Zeit, aber leider viel zu selten. Der Prozess ist ziemlich aufwändig und mir fehlt dafür einfach eine Werkstatt.',
      zeitraum_von: '2020',
      zeitraum_bis: '2022',
      note: '',
      artworks: [],
      id: '9503DA4B-1B18-7350-9B8B-DAA0BBDF2662',
      rev: '1-e4097f8eb5e9e1325b2ebf7be821c967'
    }
  ]
}
```

## FORM - SAVE sollte das Objekt sein…

```json
{
  id: '0BE5AD86-B64F-C796-A5AB-84022AA2B8D4',
  rev: '6-91c72d62a8b2e73a0722d38102590c32'
}
```

Beim ersten speichern kam das als Ergebnis:

```json
{
  id: '0BE5AD86-B64F-C796-A5AB-84022AA2B8D4',
  rev: '7-78529b2fc374a130924853b7abfbfa46'
}
```

Beim 2. Speichern

Eigentlich sollte ich die Ref übernommen haben… hab ich aber nicht….

```bash
Empfange Request vom Frontend: request:groupofwork-form-save,[object Object]
Request Command: request:groupofwork-form-save
Data:
{
  docType: 'groupofwork',
  docScope: 'user',
  title: 'Binary Voids',
  description: 'Foreign Virtual Worlds — Virtual (Travel | Street | Portrait) Photography from Control (Remedy Entertainment), Cyberpunk 2077 (CD Project Red), Hellblade (Ninja Theory), No Mans Sky (Hello Games), Watch Dogs (Ubisoft) ,The Witcher (CD Project Red) I love traveling through virtual spaces, which I’ve been exploring more and more frequently lately also by means of virtual photography. Here are a few photographs from these virtual digital worlds, created directly with the camera in the game and mostly cropped to portrait format... and yes, I admit that I’m indulging a little bit my weakness for science fiction here. A few thoughts and further information about virtual photography in general, and about the project in special I collect in my notebook (but be aware its written in german). If you like, follow along my ingame photography on Instagram',
  zeitraum_von: '1970',
  zeitraum_bis: 'heute',
  note: '',
  artworks: [],
  id: '0BE5AD86-B64F-C796-A5AB-84022AA2B8D4',
  rev: '6-91c72d62a8b2e73a0722d38102590c32',
  ref: undefined
}
{
  error: 'conflict',
  reason: 'Document update conflict.',
  status: 409,
  name: 'conflict',
  message: 'Document update conflict.',
  stack: 'Error\n' +
    '    at generateErrorFromResponse (/Users/cnichte/Documents/develop-software/werkverzeichnis-desktop/release/app/node_modules/pouchdb/lib/index.js:682:18)\n' +
    '    at fetchJSON (/Users/cnichte/Documents/develop-software/werkverzeichnis-desktop/release/app/node_modules/pouchdb/lib/index.js:7008:17)\n' +
    '    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n' +
    '    at async klass.HttpPouch.api._put (/Users/cnichte/Documents/develop-software/werkverzeichnis-desktop/release/app/node_modules/pouchdb/lib/index.js:7524:22)',
  docId: 'groupofwork_2_0BE5AD86-B64F-C796-A5AB-84022AA2B8D4'
}
```

Das Fehlerdokument sollte ich in der Art auch übernehmen und benutzen…

```text
error
reason
status
mame
stack
```

<http://guide.couchdb.org/draft/conflicts.html>