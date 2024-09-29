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
import { db_initialize } from "./Database_Pouchdb_Initialize";


/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
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

    // PouchDB.plugin(require('pouchdb-authentication'));
    PouchDB.plugin(rel);
    PouchDB.plugin(find);

    //! Alter Code
    /*
    if (databaseUri.length > 0 && databaseUri.startsWith("http")) {

      console.log(`create / open remote store ${databaseUri}`);
      
      this.db = new PouchDB(databaseUri, {
        skip_setup: false,
      });

    } else {
      const home_path: string = FileTool.get_apps_home_path();
      const localStore = `${home_path}catalogs/${databaseUri}`;

      this.db = new PouchDB(localStore, {
        skip_setup: false,
      });
    }

    this.db
    .info()
    .then(function handleResult(info: any) {
      console.info('########## Database Information - start');
      console.info(info);
      console.info('########## Database Information - end');
    })
    .catch(function handleError(err: any) {
      console.error('########## Database Error - start');
      console.error(err);
      console.error('########## Database Error - end');
    });

*/
    //! Neuer Code

    // versuche ich hier zu öffnen:
    // http://admin:adminadmin@fileserver02:5984/werkverzeichnis
    // /*
    if (this.databaseUri.length > 0 && this.databaseUri.startsWith("http")) {
      const remoteStore = this.databaseUri;

      console.log(`couchdb: create / open remote store: ${remoteStore}`);

      //! PouchDB.plugin(rel);
      //! PouchDB.plugin(find);

      this.does_remote_db_exist(remoteStore).then(function (result: boolean) {
        // open, create
        self.db = new PouchDB(remoteStore, {
          skip_setup: false,
        });

        if (!result) {
          console.log(`pouchdb: remote store does not exists: ${remoteStore}`);
          //! create and init
          if (useRelations) {
            console.log(
              `pouchdb: set relational-pouch schema for: ${remoteStore}`
            );
            let pdbr = pouchdb_relations;
            self.db.setSchema(pdbr);
          }
          // TODO DB befüllen
          self
            .initialize(true, false) //! Fills the DB with sample data on creation.
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
        } else {
          //! just open
          console.log(`pouchdb: remote store does exists: ${remoteStore}`);
        }
      });
    } else {
      const home_path: string = FileTool.get_apps_home_path();
      const localStore = `${home_path}catalogs/${databaseUri}/database`;

      FileTool.ensure_path_exist(localStore);

      this.does_local_db_exist(localStore)
        .then(function (result: boolean) {
          let pdbr = pouchdb_relations;

          //! PouchDB.plugin(rel);
          //! PouchDB.plugin(find);

          if (result) {
            console.log(`pouchdb: local store exists: ${localStore}`);

            self.db = new PouchDB(localStore, {
              skip_setup: false,
            });

            if (useRelations) {
              console.log(
                `pouchdb: set relational-pouch schema for: ${localStore}`
              );
              self.db.setSchema(pdbr);
            }
          } else {
            console.log(`pouchdb: create local store: ${localStore}.`);

            self.db = new PouchDB(localStore, {
              skip_setup: false,
            });

            if (useRelations) {
              console.log(`pouchdb: set relations schema.`);
              self.db.setSchema(pdbr);
            }

            self
              .initialize(true, false) //! Fills the DB with saple data on creation.
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

    // */
  }
  export_all(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  does_local_db_exist(name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let test: any = new PouchDB(name);
      test
        .info()
        .then(function (details: { doc_count: number; update_seq: number }) {
          if (details.doc_count == 0 && details.update_seq == 0) {
            // console.log(`pouchdb: store does not exist: ${name}`);
            resolve(false);
          } else {
            // console.log(`pouchdb: store exist: ${name}`);
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

  does_remote_db_exist(name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var db = new PouchDB(name, { skip_setup: true });
      db.info()
        .then(function (result: any) {
          if (result.hasOwnProperty("error")) {
            //  &&  result.error == 'not_found'
            console.log(`pouchdb 1: remote db does not exist:`, result);
            resolve(false);
          } else {
            console.log(`pouchdb 1: remote db exist:`, result);
            resolve(true);
          }
        })
        .catch(function (err: any) {
          console.log(`pouchdb 2: remote db does not exist:` + err);
          resolve(false);
        });
    });
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
        console.log(`pouchdb: create data`);
        db_initialize(this.db);
      } else {
        console.log(`pouchdb: skip data creation.`);
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
      return this.db.get(uuid, options); // TODO
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

      //! const composite_id: string = this.db.rel.makeDocID({type:type,id:id});
      // return this.db.get(composite_id, { conflicts: true });
      //? Mist: liefert keine Konflikte für das 2. artwork in der liste
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
      /*
      let self = this;
      return this.db.rel.save(type, data)    
      .catch(function (err: any) {
        
        if (err.status === 409) {

        } else {
          throw err; // some other error
        }
      });
*/
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
