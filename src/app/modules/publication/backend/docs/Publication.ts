/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { PublicationI } from "../../types/PublicationInterface";

const fs = require("fs-extra");

/**
 * /src/app/backend/Publikation.ts
 * Das das Template um Publikation-Dokumente zu verarbeiten.
 */
export class Publication
  extends DocumentBase
  implements PublicationI, JSONableI
{
  // System
  id: string = ""; // _id: string = '';

  docType: string = "publication";

  docScope = "user";

  // Userdata
  title: string = "";

  isbn: string = "";

  publisher: string = "";

  nationallibrary: string = "";

  url: string = "";

  description: string = "";

  shortnote: string = "";

  // Userdata, Relations
  publicationType: string = "";

  publicationWhat: string = "";

  publicationMedium: string = "";

  artworks: string[] = [];

  awards: string[] = [];

  sales: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): PublicationI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      title: this.title,
      isbn: this.isbn,
      publisher: this.publisher,
      nationallibrary: this.nationallibrary,
      url: this.url,
      description: this.description,
      shortnote: this.shortnote,

      artworks: this.artworks,
      awards: this.awards,
      sales: this.sales,
      publicationType: this.publicationType,
      publicationWhat: this.publicationWhat,
      publicationMedium: this.publicationMedium,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/publication.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Publication();
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
