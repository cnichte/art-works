/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { CalculationItemI } from "../../types/CalculationItemInterface";

const fs = require("fs-extra");

/**
 * Eine Kalkulation ist eine einfache Auflistung von Kosten.
 *
 */
export class CalculationItem
  extends DocumentBase
  implements CalculationItemI, JSONableI
{
  // System
  id: string = ""; // _id: string = '';

  docType: string = "calculationitem";

  docScope = "user";

  // Userdata
  title: string = "";

  value: number = 0;

  shortnote: string = "";

  // Userdata, Relations
  calculations: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): CalculationItemI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      title: this.title,
      value: this.value,
      shortnote: this.shortnote,

      calculations: this.calculations,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(
      __dirname,
      "../docs-json/calculation-item.json"
    );
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new CalculationItem();
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
