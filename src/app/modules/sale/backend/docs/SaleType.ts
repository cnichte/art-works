// TODO SaleType
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";
import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";

import { SaleTypeI } from "../../types/SaleTypeInterface";

const fs = require("fs-extra");

/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class SaleType extends DocumentBase implements SaleTypeI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "saleType";

  docScope: string = "user";

  // Userdata
  name: string = "";

  // Userdata, Relations
  sales: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): SaleTypeI {
    return {
      // System
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      // Userdata
      name: this.name,

      // Userdata, Relations
      sales: this.sales,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/sale-type.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new SaleType();
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
