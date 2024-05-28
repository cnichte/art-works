/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";
import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";

import { ResumeTypeI } from "../../types/ResumeTypeInterface";

const fs = require("fs-extra");

/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class ResumeType extends DocumentBase implements ResumeTypeI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "resumeType";

  docScope: string = "user";

  // Userdata
  name: string = "";

  // Userdata, Relations
  resumes: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): ResumeTypeI {
    return {
      // System
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      // Userdata
      name: this.name,

      // Userdata, Relations
      resumes: this.resumes,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/resume-type.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new ResumeType();
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
