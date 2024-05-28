/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from 'path';

import { DatabaseCRUDI } from '../../../../common/backend/types/DatabaseCRUDInterface';
import { DocumentBase } from '../../../../common/backend/DocumentBase';
import { JSONableI } from '../../../../common/backend/types/JSONableInterface';

import { SaleRightsOfUseTypeI } from '../../types/SaleRightsOfUseTypeInterface';

const fs = require('fs-extra');

/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class SaleRightsOfUseType
  extends DocumentBase
  implements SaleRightsOfUseTypeI, JSONableI
{
  // System
  id: string = ''; // _id: string = '';

  docType: string = 'salerightsofuseType';

  docScope: string = 'system';

  // Userdata
  name: string = '';

  // Userdata, Relations
  saleRightsOfUse: string[] = [];

  sales: String = '';

  toJson(): SaleRightsOfUseTypeI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      name: this.name,

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
      '../docs-json/sale-rights-of-use-type.json'
    );
    console.log(pathtofile);

    fs.readJson(pathtofile)
    .then((packageObj:any):any => {
        for (const i in packageObj) {
          const obj = new SaleRightsOfUseType();
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
