/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { NoteI } from "../../types/NoteInterface";

const fs = require("fs-extra");

export class Note extends DocumentBase implements NoteI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "note";

  docScope = "user";

  // Userdata
  title: string = "";

  content: string = "";

  shortnote: string = "";

  // Userdata, Relations
  artworks: string[] = [];

  tags: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): NoteI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      title: this.title,
      content: this.content,
      shortnote: this.shortnote,
      artworks: this.artworks,
      tags: this.tags,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   * TODO: Genres wurde nicht geladen...
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/note.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Note();
          // obj.id = uuidv4(); // relational-pouchignores this
          // und ab in die Datenbank
          super.transportAndPersist(packageObj[i], obj, database);
        }
        return null;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}
