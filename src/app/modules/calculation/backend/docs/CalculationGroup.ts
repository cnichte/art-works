/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { CalculationGroupI } from "../../types/CalculationGroupInterface";

const fs = require("fs-extra");

/**
 * Eine Kalkulation ist eine einfache Auflistung von Kosten.
 *
 */
export class CalculationGroup
  extends DocumentBase
  implements CalculationGroupI, JSONableI
{
  // System
  id: string = ""; // _id: string = '';

  docType: string = "calculationgroup";

  docScope = "user";

  // Userdata
  title: string = "";

  description: string = "";

  shortnote: string = "";

  // Userdata, Relations
  calculations: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): CalculationGroupI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,

      docType: this.docType,
      docScope: this.docScope,

      title: this.title,
      description: this.description,
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
      "../docs-json/calculation-group.json"
    );
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new CalculationGroup();
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
