/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";

import { AddressI } from "../../types/AddressInterface";

const fs = require("fs-extra");

/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class Address extends DocumentBase implements AddressI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "address";

  docScope: string = "user";

  // Userdata
  name: string = "";

  birthdate: string = "";

  postalCode: string = "";

  city: string = "";

  street: string = "";

  url: string = "";

  mail: string = "";

  phone: string = "";

  shortnote: string = "";

  // Userdata, Relations
  addressType: string = "";

  sales: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): AddressI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      name: this.name,
      birthdate: this.birthdate,

      postalCode: this.postalCode,
      city: this.city,
      street: this.street,

      url: this.url,
      mail: this.mail,
      phone: this.phone,
      shortnote: this.shortnote,

      addressType: this.addressType,
      sales: this.sales,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/address.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Address();
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
