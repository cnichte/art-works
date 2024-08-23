import { BrowserWindow, ipcMain, shell } from "electron";
import { DatabaseCRUD_Interface } from "./Database_Types";
import { Database_Pouchdb } from "./Database_Pouchdb";
import { Database_Settings } from "./Database_Settings";
import {
  IPC_BUTTON_ACTION,
  IPC_DATABASE,
  IPC_EXTERNAL_LINK,
  IPC_MESSAGE,
  IPC_SETTINGS,
} from "../common/types/IPC_Channels";
import {
  DB_RequestData,
  Settings_RequestData,
} from "../common/types/RequestTypes";
import { DocCatalog } from "../common/types/DocCatalog";
import { Database_Backup } from "./Database_Backup";

/**
 * dispatches all the ipc requests from the frontend,
 * to database commands.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/ipc
 */
export class IPC_Request_Dispatcher {
  browserWindow: BrowserWindow;
  pouchdb: DatabaseCRUD_Interface;
  settings: Database_Settings;

  useRelations: boolean = true; // you have to provide relations in Database_Pouchdb_Relations.ts

  constructor(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;

    this.settings = new Database_Settings();

    this.pouchdb = new Database_Pouchdb(
      this.settings.get_database_uri_from_startoptions(),
      this.useRelations
    );

    browserWindow.webContents.on("did-finish-load", () => {
      this.browserWindow.setTitle(
        `Catalog: ${
          this.settings.get_database_template_from_uuid(
            this.settings.get_database_uuid_from_startoptions()
          ).templateName
        } `
      );
    });

    // this.mysqldb = new Database_Mysql();
  }

  public dispatch_ipc_requests(): void {
    // ######################################################################
    // This are Examples
    // ######################################################################

    //! Pattern 1: Renderer to main (one-way)
    ipcMain.on(IPC_DATABASE, async (event, arg) => {
      // console.log("\n\n######################################################");
      console.log(`MAIN says: Request received from frontend: `, arg);
      // this.mysqldb.test();
      // console.log("------------------------------------------------------");
    });

    ipcMain.on("asyncPing", (event, args) => {
      console.log("MAIN says: asyncPing received. I send a 'asyncPong'.");
      event.sender.send("asyncPong", "asyncPong");
      // das landet nur in preload.ts
    });

    ipcMain.on("syncPing", (event, args) => {
      console.log("MAIN says: syncPing received. I return a 'syncPong'.");
      event.returnValue = "syncPong";
    });

    //! Pattern 2: Renderer to main (two-way)
    ipcMain.handle("handlePing", (event, args) => {
      console.log("MAIN says: handlePing received. I return 'handlePong'");
      return "handlePong";
    });

    ipcMain.handle("handlePingWithError", () => {
      throw new Error("MAIN throws: handlePing - throws error."); // TODO returns an empty object
    });

    //! Pattern 3: Main to renderer (see also main.ts)
    ipcMain.on("counter-value", (_event, value) => {
      console.log("MAIN says: ", value);
    });

    // ######################################################################
    // This supports my Applications API, but including Pattern 1: send()
    // ######################################################################

    // ----------------------------------------------------------------------
    // Button Action Requests
    // ----------------------------------------------------------------------

    /**
     * A button was clicked in the header
     * and an action request was sent to the server.
     * This request is simply forwarded here to interested listeners in another render process.
     */
    ipcMain.on(IPC_BUTTON_ACTION, async (event, arg) => {
      console.log(
        `MAIN says: BUTTON-ACTION-Request received from frontend: `,
        arg
      );
      //! Following Pattern 3 for header-button-actions
      this.browserWindow.webContents.send(IPC_BUTTON_ACTION, arg[0]);
    });

    // ----------------------------------------------------------------------
    // Message Action Requests
    // ----------------------------------------------------------------------

    ipcMain.on(IPC_EXTERNAL_LINK, async (event, arg) => {
      console.log(
        `MAIN says: External-Link-Request received from frontend: `,
        arg
      );
      shell.openExternal(arg[0]);
    });

    // ----------------------------------------------------------------------
    // Message Action Requests
    // ----------------------------------------------------------------------

    ipcMain.on(IPC_MESSAGE, async (event, arg) => {
      console.log(
        `MAIN says: MESSAGE-ACTION-Request received from frontend: `,
        arg
      );
      //! Following Pattern 3 for message-actions
      this.browserWindow.webContents.send(IPC_MESSAGE, arg[0]);
    });

    // ----------------------------------------------------------------------
    // Settings Requests
    // ----------------------------------------------------------------------

    ipcMain.handle(IPC_SETTINGS, async (event, arg) => {
      console.log(`MAIN says: SETTINGS-Request received from frontend: `, arg);
      const request: Settings_RequestData<DocCatalog> = arg[0];

      let result: Promise<any>;

      switch (request.type) {
        case "request:list-connections":
          result = new Promise((resolve) => {
            let obj: any = this.settings.conf.get("catalog.connection");
            resolve(obj);
          });
          break;
        case "request:get-connection":
          result = new Promise((resolve, reject) => {
            let list: any = this.settings.conf.get(
              "catalog.connection.options"
            );

            const newList = list.filter((con: any) => {
              return con.id == request.id;
            });
            console.log("CONNECTION FOUND:", newList);
            if (newList.length == 0) {
              reject("Sorry, Connection not found.");
            } else {
              resolve(newList[0]);
            }
          });
          break;
        case "request:save-connection":
          result = new Promise((resolve, reject) => {
            let list: any = this.settings.conf.get(
              "catalog.connection.options"
            );
            let result: boolean = false;

            // update existing
            const newList = list.map((item: any) => {
              if (item.id === request.data.id) {
                result = true;
                return request.data;
              } else {
                return item;
              }
            });

            if (result) {
              this.settings.conf.set("catalog.connection.options", newList);
              resolve("Connection gespeichert.");
            } else {
              // not there, then insert
              list.push(request.data);
              this.settings.conf.set("catalog.connection.options", list);
              resolve("Connection angelegt.");
            }
          });
          break;
        case "request:delete-connection":
          result = new Promise((resolve) => {
            let list: any = this.settings.conf.get("atalog.connection.options");
            const newList = list.filter((con: any) => {
              return con.id != request.data.id;
            });

            this.settings.conf.set("catalog.connection.options", newList);
            // this.settings.conf.delete('foo');

            resolve(true);
          });
          break;
        case "request:get-dbOptions":
          result = new Promise((resolve) => {
            let obj: any = this.settings.conf.get("catalog.dbOptions");
            resolve(obj);
          });
          break;
        case "request:get-startoptions":
          result = new Promise((resolve) => {
            let obj: any = this.settings.conf.get("catalog.startoptions");
            resolve(obj);
          });
          break;
        case "request:save-startoption-selected":
          result = new Promise((resolve) => {
            console.log(
              `persist 'catalog.startoptions.selected' ${request.id}`
            );
            this.settings.conf.set("catalog.startoptions.selected", request.id);
            resolve(true);
          });
          break;
        case "request:save-startoption-opensOnStartup":
          result = new Promise((resolve) => {
            console.log(
              `persist 'catalog.startoptions.opensOnStartup' ${request.id}`
            );
            this.settings.conf.set(
              "catalog.startoptions.opensOnStartup",
              request.id
            );
            resolve(true);
          });
          break;
        case "request:database-backup":
          result = new Promise((resolve, reject) => {
            Database_Backup.performBackup(request.options.dbName)
              .then(function (response) {
                return resolve(response);
              })
              .catch(function (err) {
                return reject(err);
              });
          });
          break;
        case "request:switch-catalog":
          // save the option
          this.settings.conf.set("catalog.connection.selected", request.id);
          // switch to new catalog

          this.pouchdb = new Database_Pouchdb(
            this.settings.get_database_uri_from_uuid(request.id),
            this.useRelations
          );

          this.browserWindow.setTitle(
            `Catalog: ${
              this.settings.get_database_template_from_uuid(request.id)
                .templateName
            } `
          );

          break;
        default:
          result = new Promise((reject) => {
            reject(`Sorry, this is a unknown SETTINGS-Request: ${request}`);
          });
      }

      return result;
    });

    // ----------------------------------------------------------------------
    // Database Requests
    // ----------------------------------------------------------------------

    //! Following Pattern 2 for the Database requests
    ipcMain.handle(IPC_DATABASE, async (event, arg) => {
      // console.log("\n\n######################################################");
      console.log(`MAIN says: DATABASE-Request received from frontend: `, arg);
      const request: DB_RequestData<any> = arg[0];

      let result: Promise<any>;

      switch (request.type) {
        case `request:list-all`:
          result = new Promise((resolve, reject) => {
            this.pouchdb
              .readFromRelations(request.doctype, {})
              //! .readFromQuery({ selector: { docType: request.doctype },})
              .then(function (response) {
                // This is space to transform the result before send it back.
                console.log("query-then: ", response);
                console.log("---------------------");
                return resolve(response); // response.docs
              })
              .catch(function (err) {
                console.log("---------------------");
                console.log("query-error: ", err);
                console.log("---------------------");
                return reject(err);
              });
          });
          break;
        case `request:save`:
          result = new Promise((resolve, reject) => {
            this.pouchdb
              .update(request.doctype, request.data)
              .then(function (response) {
                // This is space to transform the result before send it back.
                // { ok: true, id: '4983cc2b-27e2-49de-aa2d-3a93f732bc80', rev: '1-96b9cb7d256fd1b29c51b84dc7d59c55'
                console.log("save-then: ", response);
                console.log("---------------------");
                return resolve(response);
              })
              .catch(function (err) {
                console.log("---------------------");
                console.log("save-error: ", err);
                console.log("---------------------");
                return reject(err);
              });
          });
          break;
        case "request:data":
          result = new Promise((resolve, reject) => {
            this.pouchdb
              .readFromRelationsID(request.doctype, request.id)
              //! .readFromID(request.id, request.options)
              .then(function (response) {
                // This is space to transform the result before send it back.
                // { ok: true, id: '4983cc2b-27e2-49de-aa2d-3a93f732bc80', rev: '1-96b9cb7d256fd1b29c51b84dc7d59c55'
                console.log("data-then: ", response);
                console.log("---------------------");
                return resolve(response);
              })
              .catch(function (err) {
                console.log("---------------------");
                console.log("data-error: ", err);
                console.log("---------------------");
                return reject(err);
              });
          });
          break;
        case `request:delete`:
          result = new Promise((resolve, reject) => {
            this.pouchdb
              .delete(request.doctype, request.data)
              .then(function (response) {
                // This is space to transform the result before send it back.
                // { ok: true, id: '4983cc2b-27e2-49de-aa2d-3a93f732bc80', rev: '1-96b9cb7d256fd1b29c51b84dc7d59c55'
                console.log("delete-then: ", response);
                console.log("---------------------");
                return resolve(response);
              })
              .catch(function (err) {
                console.log("---------------------");
                console.log("delete-error: ", err);
                console.log("---------------------");
                return reject(err);
              });
          });
          break;
        default:
          result = new Promise((reject) => {
            reject(`Sorry, this is a unknown DATABASE-Request: ${request}`);
          });
      }

      return result;
    });
  }
}
