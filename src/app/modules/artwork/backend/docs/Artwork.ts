/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import path from "path";

import { MyDateValue } from "../../../../common/frontend/DateTool";
import { DatabaseCRUDI } from "../../../../common/backend/types/DatabaseCRUDInterface";
import { DocumentBase } from "../../../../common/backend/DocumentBase";
import { JSONableI } from "../../../../common/backend/types/JSONableInterface";

import { ArtworkI } from "../../types/ArtworkInterface";

const fs = require("fs-extra");

/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class Artwork extends DocumentBase implements ArtworkI, JSONableI {
  // System

  id: string = ""; // _id: string = '';

  docType: string = "artwork";

  docScope = "user";

  // Userdata

  title: string = "";

  title_addition: string = "";

  topic: string = "";

  description_long: string = "";

  description_short: string = "";

  dateCreationType: string = "date";

  dateCreationFormat: string = "YYYY";

  dateCreation: MyDateValue = {
    dateMode: "dateMoment",
    dateType: "year",
    dateFormat: "YYYY",
    date: ["2023"],
  };

  implementation: string = "";

  tool: string = "";

  forsale: boolean = false;

  price: string = "";

  shortnote: string = "";

  // Userdata, Images
  // TODO Images as Attachments?
  // Das sind die Filenames
  image_print: string = "";

  image_small: string = "";

  image_type: string = "";

  // Userdata, Relations

  artists: string[] = [];

  groupsofwork: string[] = [];

  compliations: string[] = [];

  collections: string[] = [];

  publications: string[] = [];

  editions: string[] = [];

  sales: string[] = [];

  exhibitions: string[] = [];

  awards: string[] = [];

  genres: string[] = [];

  tags: string[] = [];

  notes: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): ArtworkI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      docType: this.docType,
      docScope: this.docScope,

      title: this.title,
      title_addition: this.title_addition,
      topic: this.topic,
      description_long: this.description_long,
      description_short: this.description_short,

      dateCreation: this.dateCreation,

      implementation: this.implementation,
      tool: this.tool,
      forsale: this.forsale,
      price: this.price,

      image_print: this.image_print,
      image_small: this.image_small,
      image_type: this.image_type,

      shortnote: this.shortnote,

      artists: this.artists,
      groupsofwork: this.groupsofwork,
      compliations: this.compliations,
      collections: this.collections,
      publications: this.publications,
      editions: this.editions,
      sales: this.sales,
      exhibitions: this.exhibitions,
      awards: this.awards,
      genres: this.genres,
      tags: this.tags,
      notes: this.notes,
    };
  }

  /**
   * Lädt Beispieldaten in die Datenbank.
   *
   * @param database Mein Database-Wrapper
   */
  static loadTo(database: DatabaseCRUDI): void {
    const pathtofile = path.resolve(__dirname, "../docs-json/artwork.json");
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new Artwork();
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
