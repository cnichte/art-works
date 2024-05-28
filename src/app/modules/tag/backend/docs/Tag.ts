/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { TagI } from "../types/TagInterface";

const fs = require("fs-extra");

export class Tag extends DocumentBase implements TagI, JSONableI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "tag";

  docScope = "user";

  // Userdata
  name: string = "";

  color: string = "";

  shortnote: string = "";

  // Userdata, Relations
  // TODO: Tags können noch an alles angehängt werden...
  artworks: string[] = [];

  notes: string[] = [];

  parent: string = "";

  children: string[] = [];

  /**
   * Creates a clean JSON object from the properties of this class.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): TagI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      name: this.name,
      color: this.color,
      shortnote: this.shortnote,

      artworks: this.artworks,
      notes: this.notes,
      parent: this.parent,
      children: this.children,
    };
  }

  /**
   * Loads sample data into the database.
   *
   * @param database My Database Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/tag.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Tag();
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
