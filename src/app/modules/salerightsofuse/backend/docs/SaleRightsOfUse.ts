/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { SaleRightsOfUseI } from "../../types/SaleRightsOfUseInterface";

const fs = require("fs-extra");

export class SaleRightsOfUse
  extends DocumentBase
  implements SaleRightsOfUseI, JSONableI
{
  // System
  id: string = ""; // _id: string = '';

  docType: string = "salerightsofuse";

  docScope: string = "user";

  // Userdata
  name: string = "";

  descriptionShort: string = "";

  descriptionLong: string = "";

  url: string = "";

  shortnote: string = "";

  // Userdata, Relations
  usageType: string = "";

  saleRightsOfUse: string = "";

  sales: string[] = [];

  toJson(): SaleRightsOfUseI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      name: this.name,
      descriptionShort: this.descriptionShort,
      descriptionLong: this.descriptionLong,
      url: this.url,
      shortnote: this.shortnote,

      usageType: this.usageType,
      saleRightsOfUse: this.saleRightsOfUse,
      sales: this.sales,
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
      "../docs-json/sale-rights-of-use.json"
    );
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new SaleRightsOfUse();
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
