/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from 'path';

import { DatabaseCRUDI } from '../../../../common/backend/types/DatabaseCRUDInterface';
import { DocumentBase } from '../../../../common/backend/DocumentBase';
import { JSONableI } from '../../../../common/backend/types/JSONableInterface';

import { EditionTypeI } from '../../types/EditionTypeInterface';

const fs = require('fs-extra');

/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class EditionType
  extends DocumentBase
  implements EditionTypeI, JSONableI
{
  // System
  id: string = ''; // _id: string = '';

  docType: string = 'editionType';

  docScope: string = 'system';

  // Userdata
  name: string = '';

  // Userdata, Relations

  editions: string[] = [];

  toJson(): EditionTypeI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      name: this.name,

      editions: this.editions,
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
      '../docs-json/edition-type.json'
    );
    console.log(pathtofile);

    const packageObj = fs.readJsonSync(pathtofile);
    for (const i in packageObj) {
      const obj = new EditionType();
      // obj.id = uuidv4(); // relational-pouchignores this
      // und ab in die Datenbank
      super.transportAndPersist(packageObj[i], obj, database);
    }
  }
}
