/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

// eslint-disable-next-line import/no-cycle
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";
import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";

import { AddressTypeI } from "../../types/AddressTypeInterface";

const fs = require("fs-extra");

/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class AddressType
  extends DocumentBase
  implements AddressTypeI, JSONableI
{
  // System
  id: string = ""; // _id: string = '';

  docType: string = "addressType";

  docScope: string = "system";

  // Userdata
  name: string = "";

  // Userdata, Relations

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): AddressTypeI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      name: this.name,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * https://blog.logrocket.com/reading-writing-json-files-nodejs-complete-tutorial/
   * https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(
      __dirname,
      "../docs-json/address-type.json"
    );
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new AddressType();
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
