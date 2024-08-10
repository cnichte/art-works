import PouchDB from "pouchdb";
import find from "pouchdb-find";
import rel from "relational-pouch"; // https://github.com/pouchdb-community/relational-pouch

import { v4 as uuidv4 } from "uuid";

import { DatabaseCRUD_Interface } from "./Database_Types";
import { FileTool } from "./FileTool";
import {
  PouchDB_Info_Localstore,
  PouchDB_Info_Remotestore,
} from "../common/types/PouchDB_InfoTypes";

import { pouchdb_relations } from "./Database_Pouchdb_Relations";
import { DocumentCreator } from "./DocumentCreator";
import { Address } from "../common/types/DocAddress";
import { AddressType } from "../common/types/DocAddressType";
import { Artist } from "../common/types/DocArtist";
import { Artwork } from "../common/types/DocArtwork";
import { Award } from "../common/types/DocAward";
import {
  Calculation,
  CalculationGroup,
  CalculationItem,
} from "../common/types/DocCalculation";
import { Compilation } from "../common/types/DocCompilation";
import { Exhibition, ExhibitionType } from "../common/types/DocExhibition";
import { Genre } from "../common/types/DocGenre";
import { GroupOfWork } from "../common/types/DocGroupOfWork";
import { Note } from "../common/types/DocNote";
import {
  Publication,
  PublicationMedium,
  PublicationType,
  PublicationWhat,
} from "../common/types/DocPublication";
import { Rental } from "../common/types/DocRental";
import { Resume, ResumeType } from "../common/types/DocResume";
import {
  SaleRightsOfUse,
  SaleRightsOfUseType,
} from "../common/types/DocSaleRightsOfUse";
import { Sale, SaleType } from "../common/types/DocSale";
import { Tag } from "../common/types/DocTag";
import { DocWhiteboard } from "../common/types/DocWhiteboard";
import { Edition, EditionType } from "../common/types/DocEdition";

export class Database_Pouchdb implements DatabaseCRUD_Interface {
  databaseUri: string;
  db: any;
  useRelations: boolean;
  constructor(databaseUri: string, useRelations: boolean = false) {
    var self = this;

    this.databaseUri = databaseUri;
    this.useRelations = useRelations;

    this.databaseUri =
      this.databaseUri + (this.databaseUri.endsWith("/") ? "" : "/");

    if (this.databaseUri.length > 0 && this.databaseUri.startsWith("http")) {
      console.log("create remote store");
      this.db = new PouchDB(this.databaseUri, {
        skip_setup: false,
      });
    } else {
      const home_path: string = FileTool.get_apps_home_path();
      const localStore = `${home_path}catalogs/${databaseUri}`;

      FileTool.ensure_path_exist(localStore);

      this.does_local_db_exist(localStore)
        .then(function (result: boolean) {
          let pdbr = pouchdb_relations;

          if (result) {
            console.log(`local store exists: ${localStore}`);
            PouchDB.plugin(find);
            if (useRelations) {
              PouchDB.plugin(rel);
            }

            self.db = new PouchDB(localStore, {
              skip_setup: false,
            });

            if (useRelations) {
              self.db.setSchema(pdbr);
            }
          } else {
            console.log(`create local store: ${localStore}`);
            PouchDB.plugin(find);
            if (useRelations) {
              PouchDB.plugin(rel);
            }

            self.db = new PouchDB(localStore, {
              skip_setup: false,
            });

            if (useRelations) {
              self.db.setSchema(pdbr);
            }

            self
              .initialize(true, false) //! Fills the DB with saple data on every start.
              .then(function (response: any) {
                console.log(
                  "------------------------------------------------------"
                );
                console.log("init-then: ", response);
                console.log(
                  "------------------------------------------------------"
                );
              })
              .catch(function (err: any) {
                console.log(
                  "------------------------------------------------------"
                );
                console.log("init-error: ", err);
                console.log(
                  "------------------------------------------------------"
                );
              });
          }
        })
        .catch(function (error: any) {
          console.log("Fucking ERROR", error);
        });
    }
  }

  does_local_db_exist(name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let test: any = new PouchDB(name);
      test
        .info()
        .then(function (details: { doc_count: number; update_seq: number }) {
          if (details.doc_count == 0 && details.update_seq == 0) {
            resolve(false);
          } else {
            resolve(true);
          }

          this.db.destroy().then(function () {
            console.log("db removed");
          });
        })
        .catch(function (err: any) {
          console.log("error: " + err);
          reject(err);
        });
    });
    /*
                this.db.destroy().then(function () {
            console.log("test db removed");
          });
      
      */
  }

  get_info(
    uri: string
  ): Promise<PouchDB_Info_Localstore | PouchDB_Info_Remotestore> {
    return new Promise((resolve, reject) => {
      let test: any = new PouchDB(uri);

      test
        .info()
        .then(function (
          details: PouchDB_Info_Localstore | PouchDB_Info_Remotestore
        ) {
          resolve(details);
        })
        .catch(function (err: any) {
          console.log("error: " + err);
          reject(err);
        });
    });
  }

  initialize(exampleData: boolean, createViews: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if (exampleData) {
        DocumentCreator.loadTo<Address>(this,"./docs-json/address.json",Address);
        DocumentCreator.loadTo<AddressType>(this,"./docs-json/address-type.json",AddressType);
        DocumentCreator.loadTo<Artist>(this, "./docs-json/artist.json", Artist);
        DocumentCreator.loadTo<Artwork>(this,"./docs-json/artwork.json",Artwork);
        DocumentCreator.loadTo<Award>(this, "./docs-json/award.json", Award);
        DocumentCreator.loadTo<CalculationGroup>(this,"./docs-json/calculation-group.json",CalculationGroup);
        DocumentCreator.loadTo<CalculationItem>(this,"./docs-json/calculation-item.json",CalculationItem);
        DocumentCreator.loadTo<Calculation>(this,"./docs-json/calculation-item.json",Calculation);
        DocumentCreator.loadTo<Compilation>(this,"./docs-json/compilation.json",Compilation);
        DocumentCreator.loadTo<Edition>(this,"./docs-json/edition.json",Edition);
        DocumentCreator.loadTo<ExhibitionType>(this,"./docs-json/exhibition-type.json",ExhibitionType);
        DocumentCreator.loadTo<EditionType>(this,"./docs-json/edition-type.json",EditionType);
        DocumentCreator.loadTo<Exhibition>(this,"./docs-json/exhibition.json",Exhibition);
        DocumentCreator.loadTo<Genre>(this, "./docs-json/genre.json", Genre);
        DocumentCreator.loadTo<GroupOfWork>(this,"./docs-json/group-of-work.json",GroupOfWork);
        DocumentCreator.loadTo<Note>(this, "./docs-json/note.json", Note);
        DocumentCreator.loadTo<PublicationMedium>(this,"./docs-json/publication-medium.json",PublicationMedium);
        DocumentCreator.loadTo<PublicationType>(this,"./docs-json/publication-type.json",PublicationType);
        DocumentCreator.loadTo<PublicationWhat>(this,"./docs-json/publication-what.json",PublicationWhat);
        DocumentCreator.loadTo<Publication>(this,"./docs-json/publication.json",Publication);
        DocumentCreator.loadTo<Rental>(this, "./docs-json/rental.json", Rental);
        DocumentCreator.loadTo<ResumeType>(this,"./docs-json/resume-type.json",ResumeType);
        DocumentCreator.loadTo<Resume>(this, "./docs-json/resume.json", Resume);
        DocumentCreator.loadTo<SaleRightsOfUseType>(this,"./docs-json/sale-rights-of-use-type.json",SaleRightsOfUseType);
        DocumentCreator.loadTo<SaleRightsOfUse>(this,"./docs-json/sale-rights-of-use.json",SaleRightsOfUse);
        DocumentCreator.loadTo<SaleType>(this, "./docs-json/sale-type.json", SaleType);
        DocumentCreator.loadTo<Sale>(this, "./docs-json/sale.json", Sale);
        DocumentCreator.loadTo<Tag>(this, "./docs-json/tag.json", Tag);
        DocumentCreator.loadTo<DocWhiteboard>(this,"./docs-json/whiteboards.json",DocWhiteboard);
      }
    });
  }
  create(data: any): Promise<any> {
    if (this.useRelations) {
      console.log(
        `CREATE FROM REALATION - this.db.rel.save(${data.docType}, ${data});`
      );
      return this.db.rel.save(data.docType, data);
    } else {
      console.log(`CREATE - this.db.put(${data});`);
      return this.db.put(data);
    }
  }
  readFromQuery(query: Object): Promise<any> {
    // Mango-Query, oder "relational-pouch" query:
    //
    // https://pouchdb.com/api.html#query_index
    // https://pouchdb.com/guides/mango-queries.html
    //
    // https://github.com/pouchdb-community/relational-pouch?tab=readme-ov-file#dbrelfindtype-options
    //* PouchDB without Plugin relational-pouch
    if (query.hasOwnProperty("selector")) {
      console.log("Mango query-type detected");
    } else if (query.hasOwnProperty("type")) {
      console.log("Relational-Pouch query-type detected");
    } else {
      console.log("Unknown query-type detected");
    }

    //* PouchDB without Plugin relational-pouch
    if (this.useRelations) {
      // TODO return this.db.rel.find(type, options);
      return this.db.find(query);
    } else {
      return this.db.find(query);
    }
  }

  readFromID(uuid: string, options: any): Promise<any> {
    if (this.useRelations) {
      return this.db.get(uuid, options);
    } else {
      return this.db.get(uuid, options);
    }
  }

  readFromRelations(type: string, options: Object): Promise<any> {
    return this.db.rel.find(type, options);
    /*
    if (this.useRelations) {
      return this.db.rel.find(type, options);
    } else {
      return new Promise((reject) => {
        reject("Please use Relational Pouch...");
      });
    }
 */
  }

  readFromRelationsID(type: string, id: string): Promise<any> {
    if (this.useRelations) {
      console.log("this.db.rel.find", type, id);
      return this.db.rel.find(type, id);
    } else {
      // TODO Alles in query packen
      return new Promise((reject) => {
        reject("Please use Relational Pouch...");
      });
    }
  }

  update(type: string, data: any): Promise<any> {
    if (this.useRelations) {
      console.log("this.db.rel.save", type, data);
      return this.db.rel.save(type, data);
    } else {
      console.log("this.db.put", data);
      return this.db.put(data);
    }
  }

  //? https://pouchdb.com/api.html#delete_document
  delete(type: string, data: any): Promise<any> {
    if (this.useRelations) {
      console.log("this.db.rel.del", type, data);
      return this.db.rel.del(type, data);
    } else {
      console.log("this.db.remove", data);
      return this.db.remove(data);
    }
  }

  //? https://stackoverflow.com/questions/29877607/pouchdb-delete-alldocs-javascript
  deleteAll(): Promise<any> {
    return this.db
      .allDocs({ include_docs: true })
      .then((allDocs: { rows: any[] }) => {
        return allDocs.rows.map((row: { id: any; doc: { _rev: any } }) => {
          return { id: row.id, _rev: row.doc._rev, _deleted: true };
        });
      })
      .then((deleteDocs: any) => {
        return this.db.bulkDocs(deleteDocs);
      });
  }
}
