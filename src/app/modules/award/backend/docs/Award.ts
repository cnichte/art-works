/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { AwardI } from "../../types/AwardInterface";

const fs = require("fs-extra");

/**
 * Ausgezeichnet werden kann ein Werk, eine Serie oder eine Publikation.
 * Prints, Reproduktionen?
 */
export class Award extends DocumentBase implements AwardI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "award";

  docScope = "user";

  // Userdata
  title: string = "";

  year: number = 2023;

  description: string = "";

  url: string = "";

  shortnote: string = "";

  // Userdata, Relations
  artworks: string[] = [];

  compilation: string = "";

  publication: string = "";

  notes: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): AwardI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      title: this.title,
      year: this.year,
      description: this.description,
      url: this.url,
      shortnote: this.shortnote,

      artworks: this.artworks,
      compilation: this.compilation,
      publication: this.publication,
      notes: this.notes,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/award.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Award();
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
