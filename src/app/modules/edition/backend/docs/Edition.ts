/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";
import { EditionPriceI } from "../../types/EditionPriceInterface";

import { EditionI } from "../../types/EditionInterface";

const fs = require("fs-extra");

/**
 * Das sind quasi die Templates für Editionen.
 */
export class Edition extends DocumentBase implements EditionI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "edition";

  docScope = "user";

  // Userdata
  name: string = "";

  description: string = "";

  edition: number = 0;

  artistsPrint: number = 0;

  prices: EditionPriceI[] = [];

  shortnote: string = "";

  // Userdata, Relations
  editionType: string = "";

  artworks: string[] = [];

  sales: string[] = [];

  notes: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): EditionI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      name: this.name,
      description: this.description,
      edition: this.edition,
      artistsPrint: this.artistsPrint,
      prices: this.prices,
      shortnote: this.shortnote,

      editionType: this.editionType,
      artworks: this.artworks,
      sales: this.sales,

      notes: this.notes,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   * TODO: Ediitionen werden nicht geladen!!
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/edition.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Edition();
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
