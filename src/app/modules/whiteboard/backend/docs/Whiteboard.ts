/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from 'path';

import { DatabaseCRUDI } from '../../../../common/backend/types/DatabaseCRUDInterface';
import { DocumentBase } from '../../../../common/backend/DocumentBase';
import { JSONableI } from '../../../../common/backend/types/JSONableInterface';

import { WhiteboardI } from '../../types/WhiteboardInterface';

const fs = require('fs-extra');

export class Whiteboard extends DocumentBase implements WhiteboardI, JSONableI {
  // System
  id: string = ''; // _id: string = '';

  docType: string = 'tag';

  docScope = 'user';

  // Userdata
  name: string = '';

  color: string = '';

  shortnote: string = '';

  // Userdata, Relations
  // TODO: Tags können noch an alles angehängt werden...
  artworks: string[] = [];

  notes: string[] = [];

  /**
   * Creates a clean JSON object from the properties of this class.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): WhiteboardI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      name: this.name,
      shortnote: this.shortnote,
    };
  }

  /**
   * Loads sample data into the database.
   *
   * @param database My Database Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, '../docs-json/whiteboards.json');
    console.log(pathtofile);

    fs.readJson(pathtofile)
    .then((packageObj:any):any => {
      for (const i in packageObj) {
        const obj = new Whiteboard();
        // obj.id = uuidv4(); // relational-pouchignores this
        // und ab in die Datenbank
        super.transportAndPersist(packageObj[i], obj, database);
      }

      return null;
    })
    .catch((err: any) => {
      console.error(err)
    })

    fs.readJson(pathtofile)
      .then((packageObj: { version: any }) => {

      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}
