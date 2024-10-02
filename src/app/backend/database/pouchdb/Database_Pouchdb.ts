import PouchDB from "pouchdb";
import find from "pouchdb-find";
import rel from "relational-pouch"; // https://github.com/pouchdb-community/relational-pouch

import { DatabaseCRUD_Interface } from "../../framework/types/Database_Types";
import { FileTool } from "../../framework/tools/FileTool";
import {
  PouchDB_Info_Localstore,
  PouchDB_Info_Remotestore,
} from "../../../common/types/PouchDB_InfoTypes";

import { pouchdb_relations } from "./Database_Pouchdb_Relations";
import { db_initialize } from "./Database_Pouchdb_Initialize";
import { DB_Request } from "../../../common/framework/types/system/RequestTypes";
import { Database_Export } from "../../framework/tools/Database_Export";

/**
 * You can use this apdapter with or without relational-pouch.
 * If you use relational-pouch you can also optionally bypass it.
 * This is controlled via the `use_relation` request option.
 *
 * @see `src/app/common/types/RequestTypes.ts`
 *
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

        if (result) {
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

  // https://stackoverflow.com/questions/37229561/how-to-import-export-database-from-pouchdb
  // https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript/30832210#30832210

  export_all(): Promise<boolean> {
    let self = this;
    return new Promise((resolve, reject) => {
      console.log("PERFORMING EXPORT: DB", this.db);
      this.db
        .allDocs({
          include_docs: true,
          attachments: true,
        })
        .then(function (result: { rows: any }) {
          const json = result.rows;
          const json_doc = json.map((item: any) => item.doc);

          // console.log("PERFORMING EXPORT: file", file);
          // console.log("PERFORMING EXPORT: json", json);
          // console.log("PERFORMING EXPORT: json-doc", json_doc);
          Database_Export.perform(self.databaseUri, json_doc)
            .then(function (result: any) {
              resolve(result);
            })
            .catch(function (err: any) {
              reject(err);
            });
        })
        .catch(function (error: any) {
          console.log(error);
          reject(error);
        });
    });
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
        db_initialize(this);
      } else {
        console.log(`pouchdb: skip data creation.`);
      }
    });
  }
  create(data: any, use_relation: boolean): Promise<any> {
    if (use_relation) {
      if ("rel" in this.db) {
        // use relational-pouch find
        // https://github.com/pouchdb-community/relational-pouch?tab=readme-ov-file#dbrelfindtype-options
        // https://github.com/pouchdb-community/relational-pouch?tab=readme-ov-file#dbrelsavetype-object
        return this.db.rel.save(data.docType, data);
      } else {
        // no plugin found
        return this.db.put(data);
      }
    } else {
      // dont use_relation
      return this.db.put(data);
    }
  }

  // TODO: readFromID hier mit einbinden...
  read(props: DB_Request): Promise<any> {
    if (props.request_options.includes("use_relation")) {
      console.log("you want to use relational-pouch.");
      if ("rel" in this.db) {
        console.log("relational-pouch is in place.");
        // use relational-pouch find
        // https://github.com/pouchdb-community/relational-pouch?tab=readme-ov-file#dbrelfindtype-options
        if ("query_options" in props) {
          return this.db.rel.find(props.doctype, props.query_options);
        } else {
          return this.db.rel.find(props.doctype);
        }
      } else {
        console.log(
          "relational-pouch is NOT in place. I try a standard query."
        );
        // no plugin found, try a query
        let query = {
          selector: { doctype: props.doctype },
          ...props.query_options,
        };
        return this.db.find(query);
      }
    } else {
      console.log("you DONT want to use relational-pouch, but the default.");
      // dont use_relation
      return this.db.find(props.query);
    }
  }

  readFromID(props: DB_Request): Promise<any> {
    if (props.request_options.includes("use_relation")) {
      if ("rel" in this.db) {
        // use relational-pouch find
        // https://github.com/pouchdb-community/relational-pouch?tab=readme-ov-file#dbrelfindtype-id
        //! const composite_id: string = this.db.rel.makeDocID({type:type,id:id});
        // return this.db.get(composite_id, { conflicts: true });
        //? Mist: liefert keine Konflikte für das 2. artwork in der liste
        return this.db.rel.find(props.doctype, props.id);
      } else {
        // no plugin found, try a query
        let query = {
          selector: {
            doctype: props.doctype,
            id: props.id,
          },
          ...props.query_options,
        };
        return this.db.find(query);
      }
    } else {
      // dont use_relation
      return this.db.get(props.id, props.query_options);
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
