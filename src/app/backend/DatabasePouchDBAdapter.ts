/* eslint-disable default-case */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
// import * as blobUtil from 'blob-util';
import log from "electron-log/main";

import { DatabaseCRUDI } from "../common/backend/types/DatabaseCRUDInterface";
import { DatabaseAdapterI } from "../common/backend/types/DatabaseAdapterInterface";
import { DatabasePouchDB } from "./DatabasePouchDB";
import { AttachmentAction } from "../common/frontend/types/AttachmentTypes"; // TODO umziehen nach? /common/types/AttachmentTypes
import { dialog } from "electron";

const IPC_CHANNEL: string = "ipc-database";

// Methode zum konvertieren von DataURL String zu bas64String
const getBase64StringFromBase64URL = (dataURL: string) =>
  dataURL.replace("data:", "").replace(/^.+,/, "");

//! https://www.cloudnweb.dev/2019/7/promises-inside-a-loop-javascript-es6

/**
 * DBAdapter (Broker) sits between the database and the frontend (via event processing).
 * dispatches the requests and executes CRUD commands on the database,
 * evaluates the feedback for errors,
 * and returns a response to the requester accordingly.
 *
 * Return object if successful: { request: string, data: object }
 * Return object on error: { request: string, error: object }
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 *
 * @export
 * @class DatabasePouchDBAdapter
 * @implements {DatabaseAdapterInterface}
 */
export class DatabasePouchDBAdapter implements DatabaseAdapterI {
  db: DatabaseCRUDI;

  appHomePath: string;

  /**
   * Creates an instance of DatabasePouchDBAdapter.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} appHomePath
   * @param {boolean} [insertExampleData=false] - Füge Beispieldaten ein
   * @param {boolean} [createViews=false] - Erzeuge Views (TODO)
   * @memberof DatabasePouchDBAdapter
   */
  constructor(
    appHomePath: string,
    insertExampleData: boolean = false,
    createViews: boolean = false
  ) {
    this.appHomePath = appHomePath;

    // TODO: Parameter aus den Settings lesen.

    //* remote
    // Die remote Datenbank hat ihre lokale Version unter macOS hier abgelegt:
    // ~/Library/Application Support/CouchDB2/etc/couchdb
    // /Users/cnichte/Library/Preferences/couchdb2-local.ini
    // In der ini kann man auch den Pfad zur Datenbank verbiegen.
    // Beim firststart müsste man nur die ini an diesem Ort neu schreiben, bevor auf die DB zugegriffen wird.
    // Der Pfad zur ini wird sich für für macOS Win und Linux unterscheiden.

    this.db = new DatabasePouchDB(
      "http://admin:adminadmin@fileserver02:5984/",
      "werkverzeichnis"
    );

    //* local
    // Die lokal angelegte Datenbank liegt für einen dev build (npm start) hier:
    // /Users/cnichte/Documents/develop-software/werkverzeichnis-desktop/werkverzeichnisLocalTestDB
    // TODO Für einen Production build (npm run package) funktioniert die lokale Datenbank noch nicht?
    // TODO Es wird keine Datenbank erzeugt, und auch keine Daten angelegt?
    // In der Entwicklung geht es aber.
    //! this.db = new DatabasePouchDB(appHomePath, 'werkverzeichnis');

    this.db.initialize(insertExampleData, createViews); // true
  }

  /**
   * Assigns the requests to the responsible method.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} request
   * @param {*} data
   * @param {*} options
   * @param {Electron.IpcMainEvent} event
   * @memberof DatabasePouchDBAdapter
   */
  dispatch(request: string, data: any, options: any, event: any) {
    // TODO Mode als Parameter übergeben, und nicht extrahieren...
    // 'request:artist-delete'

    if (request !== undefined && request.startsWith("request:")) {
      const s = request.indexOf(":") + 1;
      const e = request.indexOf("-");
      const module = request.substring(s, e);

      log.info(`Request: '${request}'`);
      log.info(`Modul  : '${module}'`);
      log.info(`Data   : `, data);
      log.info(`Options: `, options);

      // Das Ding ist wie ne Registry, damit nur 'autorisierte Anfragen' durch kommen.
      // TODO: das könnte ich trotzdem noch einen Tick generischer machen (die custom commands)
      //* zB: module: 'addressTypes' , aktion: 'list-custom' -> target:  'query_list' (function call)
      // das könnte ich so in der art im Modul hinterlegen, als erlaubte anfragen...
      switch (request) {
        case `request:${module}-list`:
          this.query_list(module, request, options, event);
          break;
        case `request:${module}-view`:
          this.query_item(module, request, data, options, event);
          break;
        case `request:${module}-form`:
          this.query_item(module, request, data, options, event);
          break;
        case `request:${module}-form-save`:
          this.query_update(module, request, data, options, event);
          break;
        case `request:${module}-form-get-object`:
          this.create_object(module, request, options, event);
          break;
        case `request:${module}-form-create`:
          // TODO check:
          // module: string, req: string, data: any, options: any, event: any
          this.query_create(module, request, data, options, event);
          break;
        case `request:${module}-delete`:
          // TODO module: string, req: string, id: string, options: any, event: any
          // TODO data enthält die ID zum löschen?
          this.query_delete(module, request, data, options, event);
          break;
        case "request:saleTypes-list-custom":
          log.info(`###### CUSTOM Request: ${request}`);
          this.query_list(module, request, options, event);
          break;
        case "request:publicationType-list-custom":
          log.info(`###### CUSTOM Request: ${request}`);
          this.query_list(module, request, options, event);
          break;
        case "request:publicationWhat-list-custom":
          log.info(`###### CUSTOM Request: ${request}`);
          this.query_list(module, request, options, event);
          break;
        case "request:publicationMedium-list-custom":
          log.info(`###### CUSTOM Request: ${request}`);
          this.query_list(module, request, options, event);
          break;
        case "request:addressTypes-list-custom":
          log.info(`###### CUSTOM Request: ${request}`);
          this.query_list(module, request, options, event);
          break;
        case "request:tags-find-custom":
          log.info(`###### CUSTOM Request: ${request}`);
          // TODO this.query(module, request, options, event);
          this.query_list(module, request, options, event);
          break;
        case "request:attachment-download-custom":
          log.info(`###### CUSTOM Request: ${request}`);

          // TODO Dialog kann nur von main aus geöffnet werden...
          // https://www.electronjs.org/docs/latest/api/dialog
          // https://www.electronjs.org/docs/latest/api/download-item
          dialog
            .showSaveDialog({
              title: "Attachment speichern",
              filters: [
                { name: "Images", extensions: ["jpg", "jpeg"] },
                { name: "All Files", extensions: ["*"] },
              ],
              properties: ['createDirectory', 'showOverwriteConfirmation'],
            })
            .then((result) => {
              console.log("showSaveDialog - canceled ", result.canceled);
              console.log("showSaveDialog - filePath", result.filePath);
            })
            .catch((err) => {
              console.log("showSaveDialog - error", err);
            });

          // Hier wird im Grunde kein Ergebnis zurück geliertert / und erwartet.

          break;
        default:
          log.info(`Unbekannter Request: ${request}`);
          break;
      }
    } else {
      log.info(`Bad Request: ${request}`);
    }
  }

  /**
   * Handle Attachment Actions for the Document.
   * Das nutze ich nicht weil es für Bulk operationen
   * nicht funktioniert.
   *
   * Ich könnte das aber nutzen um zB. ein einzelnes Attachment (oder mehrere) herunter zu laden.
   *
   * @param module
   * @param doc_id
   * @param options
   * @returns
   */
  private handle_attachments(
    module: string,
    doc_id: any,
    options: any
  ): Promise<any> {
    let result_id: any = doc_id; // return the last result if no attachments

    if ("attachmentActions" in options) {
      let actions: AttachmentAction[] = options["attachmentActions"];

      actions.forEach(async (action) => {
        console.log(
          "---------| performing attachment-action for",
          result_id,
          action.name,
          action.attachment.id
        );

        // ist:  'upload' | 'remove' | 'download' | 'delete'
        // soll: 'add' | 'download' | 'remove'
        switch (action.name) {
          case "upload": // add, update
            // result = error-object, or: id {id:1, rev:"1-..."}

            //* DIE result neue DOC-ID muss durch geroutet werdem zum nächsten addAttachment.
            // TODO Das funktioniert nur beim ersten mal...
            //* ...am besten immer auf das Ergebnis warten.
            // https://stackoverflow.com/questions/40328932/javascript-es6-promise-for-loop
            // https://medium.com/@juanguardado/event-loops-promises-and-their-next-generation-counterparts-36d1eb87104d
            // https://medium.com/developer-rants/running-promises-in-a-loop-sequentially-one-by-one-bd803181b283
            // https://brockherion.dev/blog/posts/keep-your-async-code-fast-with-promise-all/
            // https://www.cloudnweb.dev/2019/7/promises-inside-a-loop-javascript-es6
            // -> https://sliceofdev.com/posts/promises-with-loops-and-array-methods-in-javascript
            // https://www.learnwithjason.dev/blog/keep-async-await-from-blocking-execution/

            // arbeitet intern jetzt mit async und await, so das jetzt eigentlich auf das Ergebnis gewartet werden sollte.
            console.log("---------| addAttachment to before:", result_id);
            result_id = await this.db.addAttachment(
              module,
              result_id,
              action.attachment.id,
              action.attachment.data,
              action.attachment.content_type
            );
            console.log("---------| addAttachment to after:", result_id);
            // TODO: Was passiert bei einem Fehler?
            break;
          case "remove": // TODO and not delete? wirklich?
            break;
          case "download":
            break;
          case "delete":
            break;
        }
      });
    }

    return result_id;
  }

  /**
   * Process the result, which means making a log output in the console, and sending the data back to the frontend.
   * TODO: That could go into a base class.
   *
   * @param {string} who
   * @param {*} result
   * @param {*} req
   * @param {*} event
   * @return {*}
   * @memberof DatabasePouchDBAdapter
   */
  handle_result(who: string, result: any, req: any, event: any): any {
    log.info(`############## ${who} result`, result);
    //* Schicke Daten zurück.
    event.reply(IPC_CHANNEL, {
      request: req,
      data: result,
    });
    return result;
  }

  /**
   * Evaluate error object and return standardized.
   * TODO: That could go into a base class.
   *
   * @param {string} who
   * @param {*} req
   * @param {*} err
   * @param {*} event
   * @memberof DatabasePouchDBAdapter
   */
  handle_my_fucking_errors(who: string, req: any, err: any, event: any): void {
    log.info(`############## ${who} error`, err);

    // https://pouchdb.com/guides/conflicts.html
    if (err.name === "conflict") {
      console.log("WE HAVE a CONFLICT!");
    } else {
      // some other error
      console.log("WE HAVE no CONFLICT BUT ANOTHER ERROR");
    }

    if ("error" in err && "reason" in err) {
      // all good, that's how it should be...
    } else if ("message" in err) {
      // i map that...
      err.error = err.message;
      err.reason = "";
    } else {
      // fallback
      err.error = err.toString();
      err.reason = "";
    }

    //* Send back errors.
    event.reply(IPC_CHANNEL, {
      request: req,
      error: err,
    });

    // TODO return a Promise
  }

  /**
   * TODO Parameter options ist eine Query, das ist missverständlich...
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param {string} module
   * @param {string} req
   * @param {*} options - This is a couchdb query
   * @param {Electron.IpcMainEvent} event
   * @memberof DatabasePouchDBAdapter
   */
  query(module: string, req: string, options: any, event: any) {
    this.db
      .readFromQuery(options)
      .then((result) => {
        this.handle_result("query", result, req, event);
      })
      .catch((err) => {
        this.handle_my_fucking_errors("query", req, err, event);
      });
  }

  /**
   * Get a list of items.
   *
   * Return object if successful: { request: string, data: object }
   * Return object on error: { request: string, error: object }
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} module
   * @param {string} req
   * @param {*} options
   * @param {Electron.IpcMainEvent} event
   * @memberof DatabasePouchDBAdapter
   */
  query_list(module: string, req: string, options: any, event: any) {
    this.db
      .readFromRelations(module, {})
      .then((result) => {
        this.handle_result("query_list", result, req, event);
      })
      .catch((err) => {
        this.handle_my_fucking_errors("query_list", req, err, event);
      });
  }

  /**
   * Get an item.
   *
   * Return object if successful: { request: string, data: object }
   * Return object on error: { request: string, error: object }
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} module
   * @param {string} req
   * @param {string} id
   * @param {*} options
   * @param {Electron.IpcMainEvent} event
   * @memberof DatabasePouchDBAdapter
   */
  query_item(
    module: string,
    req: string,
    id: string,
    options: any,
    event: any
  ) {
    this.db
      .readFromRelationsID(module, id)
      // .readFromQuery({ selector: { docType: 'artist' },})
      .then((result) => {
        this.handle_result("query_item", result, req, event);
      })
      .catch((err) => {
        this.handle_my_fucking_errors("query_item", req, err, event);
      });
  }

  /**
   * Delete an item.
   *
   * Return object if successful: { request: string, data: object }
   * Return object on error: { request: string, error: object }
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} module
   * @param {string} req
   * @param {string} id
   * @param {*} options
   * @param {Electron.IpcMainEvent} event
   * @memberof DatabasePouchDBAdapter
   * module: string, req: string, id: string, options: any, event: any
   */
  query_delete(
    module: string,
    req: string,
    id: string,
    options: any,
    event: any
  ) {
    log.info("query_delete:");
    // log.info(arg[1]);
    //! Prüfe arg[1] = type GroupOfWorkInterfacce
    // https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript

    this.db
      .delete(module, id)
      .then((result) => {
        this.handle_result("query_delete", result, req, event);
      })
      .catch((err) => {
        this.handle_my_fucking_errors("query_delete", req, err, event);
      });
  }

  /**
   * Create an item.
   *
   * Return object if successful: { request: string, data: object }
   * Return object on error: { request: string, error: object }
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} req
   * @param {*} data
   * @param {*} options
   * @param {Electron.IpcMainEvent} event
   * @memberof DatabasePouchDBAdapter
   *
   */
  query_create(
    module: string,
    req: string,
    data: any,
    options: any,
    event: any
  ) {
    log.info("Data:");
    log.info(data);

    //! Prüfe arg[1] = type GroupOfWorkInterfacce
    // https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript

    this.db
      .create(data)
      .then((result) => {
        this.handle_result("query_create", result, req, event);
      })
      .catch((err) => {
        this.handle_my_fucking_errors("query_create", req, err, event);
      });
  }

  /**
   * Update an item.
   *
   * Return object if successful: { request: string, data: object }
   * Return object on error: { request: string, error: object }
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} module
   * @param {string} req
   * @param {*} data
   * @param {*} options
   * @param {Electron.IpcMainEvent} event
   * @memberof DatabasePouchDBAdapter
   */
  query_update(
    module: string,
    req: string,
    data: any,
    options: any,
    event: any
  ) {
    this.db
      .update(module, data)
      .then((result) => {
        // result_1 = { id: 'B715637E-EFF5-8C61-8EFD-4C360A6066A9',rev: '3-de4bc24aad8f798123e2bcbc4db8f81d'}
        this.handle_result("query_update", result, req, event);
      })
      .catch((err) => {
        this.handle_my_fucking_errors("query_update", req, err, event);
      });
  }

  /**
   * Create an empty item for the form (in 'neu' mode).
   * It is not yet written to the database.
   *
   * Return object if successful: { request: string, data: object }
   * TODO Return object on error: { request: string, error: object }
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @param {string} module
   * @param {string} req
   * @param {Electron.IpcMainEvent} event
   * @memberof DatabasePouchDBAdapter
   */
  create_object(module: string, req: string, options: any, event: any) {
    this.db
      .objectFactory(module)
      .then((result) => {
        this.handle_result("create_object", result, req, event);
      })
      .catch((err) => {
        this.handle_my_fucking_errors("create_object", req, err, event);
      });
  }
}

/*

  ) {
    const that = this;
    this.db
      .update(module, data)
      .then(function handleResult(this: any, result) {
        if ('attachmentActions' in options) {
          data.rev = result.rev;

          const getBase64StringFromBase64URL = (dataURL: string) =>
            dataURL.replace('data:', '').replace(/^.+,/, '');

          const base64 = getBase64StringFromBase64URL(
            options.attachments[0].data
          );

          that.db
            .addAttachment(
              module,
              data,
              options.attachments[0].id,
              base64,
              options.attachments[0].contentType
            )
            .then(function handleAttResult(attResult: any) {
              log.info('Attachment-Result:', attResult);
              return attResult;
            })
            .catch(function handleAttErrors(attErr: any) {
              log.info('Attachment-Error', attErr);
            });
        }

        //* Schicke Ergebnis zurück.
        log.info('Update-Result', result);
        event.reply(IPC_CHANNEL, {
          request: req,
          data: result,
        });
        return result;
      })
      .catch(function handleErrors(err) {
        log.info(err);

        //* Schicke Fehler zurück.
        event.reply(IPC_CHANNEL, {
          request: req,
          error: err,
        });
      });
  }







      if ('attachmentActions' in options && options.attachmentActions.lengh > 0) {
      options.attachmentActions.forEach((actionItem: AttachmentAction) => {
        const base64 = getBase64StringFromBase64URL(actionItem.attachment.data);

        ! https://javascript.info/promise-chaining
        https://stackoverflow.com/questions/28232034/put-multiple-attachments-on-a-pouchdb-document-in-one-transaction

        if (actionItem.name === 'upload') {

          TODO Die Frage ist ab hier ob die geänderten inhalte in data ein update erfahren.
          TODO sonst muss ich vorher ein update machen.
          TODO und ob der loop funktioniert...
          TODO wie gebe ich ref weiter?

          this.db
            .addAttachment(
              module,
              data,
              options.attachments[0].id,
              base64,
              options.attachments[0].contentType
            )
            .then(function handleAttResult(attResult: any) {
              log.info('Attachment-Result:', attResult);
              return attResult;
            })
            .catch(function handleAttErrors(attErr: any) {
              log.info('Attachment-Error', attErr);
            });
        } else if (actionItem.name === 'remove') {
          // TODO remove an attachment
        }
      }); // forEach
    } else {
      // standard update
    }
*/
