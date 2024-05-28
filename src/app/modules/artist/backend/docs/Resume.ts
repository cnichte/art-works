/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";

import { ResumeI } from "../../types/ResumeInterface";

const fs = require("fs-extra");

/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class Resume extends DocumentBase implements ResumeI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "resume";

  docScope: string = "user";

  // Userdata
  title: string = "";

  what: string = "";

  where: string = "";

  from: string = "";

  to: string = "";

  shortnote: string = "";

  // Userdata, Relations
  resumeType: string = "";

  artist: string = "";

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): ResumeI {
    return {
      // System
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      // Userdata
      title: this.title,
      what: this.what,
      where: this.where,

      from: this.from,
      to: this.to,

      shortnote: this.shortnote,

      // Userdata, Relations
      resumeType: this.resumeType,
      artist: this.artist,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/resume.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Resume();
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
