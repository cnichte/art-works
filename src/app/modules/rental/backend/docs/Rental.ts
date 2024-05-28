/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { RentalI } from "../../types/RenatlInterface";

const fs = require("fs-extra");

export class Sale extends DocumentBase implements RentalI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "sale";

  docScope = "user";

  // Userdata
  editionNumber: number = 0;

  calculatedPrice: number = 0;

  paid: number = 0;

  shortnote: string = "";

  // Userdata, Relations
  saleType: string = "";

  saleRightsOfUse: string = "";

  customer: string = "";

  artwork: string = "";

  publication: string = "";

  edition: string = "";

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): RentalI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      editionNumber: this.editionNumber,

      calculatedPrice: this.calculatedPrice,
      paid: this.paid,
      shortnote: this.shortnote,

      saleType: this.saleType,
      saleRightsOfUse: this.saleRightsOfUse,

      customer: this.customer,

      artwork: this.artwork,
      publication: this.publication,
      edition: this.edition,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/renatal.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Sale();
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
