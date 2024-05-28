/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { ExhibitionI } from "../../types/ExhibitionInterface";

const fs = require("fs-extra");

export class Exhibition extends DocumentBase implements ExhibitionI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "exhibition";

  docScope = "user";

  // Userdata
  title: string = "";

  date_vernissage: string = "";

  date_finissage: string = "";

  description: string = "";

  url: string = "";

  shortnote: string = "";

  // Userdata, Relations
  artworks: string[] = [];

  exhibitionType: string = "";

  location: string = "";

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): ExhibitionI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      title: this.title,
      date_vernissage: this.date_vernissage,
      date_finissage: this.date_finissage,
      description: this.description,
      url: this.url,
      shortnote: this.shortnote,

      artworks: this.artworks,
      exhibitionType: this.exhibitionType,
      location: this.location,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/exhibition.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Exhibition();
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
