/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";
import { GroupOfWorkI } from "../../types/GroupOfWorkInterface";

const fs = require("fs-extra");

export class GroupOfWork
  extends DocumentBase
  implements GroupOfWorkI, JSONableI
{
  // System

  id: string = ""; // _id: string = '';

  docType: string = "groupofwork";

  docScope = "user";

  // Userdata

  title: string = "";

  description: string = "";

  zeitraum_von: string = "";

  zeitraum_bis: string = "";

  shortnote: string = "";

  // Userdata, Relations

  artworks: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): GroupOfWorkI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      title: this.title,
      description: this.description,
      zeitraum_von: this.zeitraum_von,
      zeitraum_bis: this.zeitraum_bis,
      shortnote: this.shortnote,

      artworks: this.artworks,
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
      "../docs-json/group-of-work.json"
    );
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new GroupOfWork();
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
