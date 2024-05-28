import { DatabaseAdapterI } from '../common/backend/types/DatabaseAdapterInterface';
import { DatabaseCRUDI } from '../common/backend/types/DatabaseCRUDInterface';
import { DatabaseSettings } from './DatabaseSettings';

const { app } = require('electron');

const IPC_CHANNEL: string = 'ipc-settings';

/**
 * Also this Adapter sits between the database and the frontend (via event processing).
 * dispatches the requests and executes CRUD commands on the database,
 * evaluates the feedback for errors,
 * and returns a response to the requester accordingly.
 *
 * Even if the settings only use a pseudo database.
 * - a simple JSON file in the filesystem -
 * this way I stay consistent in the implementation of the backend,
 * even if it might seem a bit too complicated in this case.
 *
 * TODO: Return object if successful: { request: string, data: object }
 * TODO: Return object on error: { request: string, error: object }
 *
 * @export
 * @class DatabaseSettingsAdapter
 * @implements {DatabaseAdapterInterface}
 */
export default class DatabaseSettingsAdapter implements DatabaseAdapterI {
  db: DatabaseCRUDI;

  appHomePath: string;

  /**
   * Creates an instance of DatabaseSettingsAdapter.
   *
   * @param {string} appHomePath
   * @param {string} appName
   * @param {boolean} [insertExampleData=false] - Füge Beispieldaten ein
   * @param {boolean} [createViews=false] - Erzeuge Views (TODO)
   * @memberof DatabaseSettingsAdapter
   */
  constructor(
    appHomePath: string,
    appName: string,
    insertExampleData: boolean = false,
    createViews: boolean = false
  ) {
    this.appHomePath = appHomePath;

    this.db = new DatabaseSettings(appName, appHomePath);
    this.db.initialize(insertExampleData, createViews); // true
  }

  /**
   *
   *
   * @param {string} request
   * @param {*} data
   * @param {*} options
   * @param {*} event
   * @memberof DatabaseSettingsAdapter
   */
  dispatch(request: string, data: any, options: any, event: any): void {
    console.log('---------- Dispatch Settings Request.');
    if (request !== undefined && request.startsWith('request:')) {
      const s = request.indexOf(':') + 1;
      const e = request.indexOf('-');
      const module = request.substring(s, e);

      console.log(`Request: '${request}'`);
      console.log(`Modul: '${module}'`);
      console.log(`Data: '${data}'`);
      console.log(`Options: '${options}'`);

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
          this.query_create(module, request, options, event);
          break;
        case `request:${module}-delete`:
          this.query_delete(module, request, data, options, event);
          break;

        default:
          console.log(`Unbekannter Request: ${request}`);
          break;
      }
    } else {
      console.log(`Bad Request: ${request}`);
    }
  }

  /**
   *
   * @param module
   * @param req
   * @param options
   * @param event
   */
  query(module: string, req: string, options: any, event: any): void {

  }

  /**
   *
   *
   * @param {string} module
   * @param {string} req
   * @param {*} options
   * @param {*} event
   * @memberof DatabaseSettingsAdapter
   */
  query_list(module: string, req: string, options: any, event: any): void {
    // Eine Query vorbereiten.
    // In Pouch DB ist das Mango-Query.
    interface Query {
      module: string;
    }

    let query: Query;
    // So erzwinge ich einen String.
    // Nur die darf man als Property namen verwenden: obj[query.module]
    // Aber die Information geht bei Übergabe an die DB verloren.
    // So das mir das nix nützt weil ich da ja Ergebnisse zusammen setzen will
    // TODO Das könnte ich natürlich auch hier machen?
    query = {
      module,
    };

    // Die Abfrage starten
    this.db
      .readFromQuery(query)
      .then(function handleResult(result) {
        //* Schicke Daten zurück.
        event.reply(IPC_CHANNEL, {
          request: req,
          data: result,
        });
        return result;
      })
      .catch(function handleErrors(err) {
        console.log(err);

        //* Schicke Fehler zurück.
        event.reply(IPC_CHANNEL, {
          request: req,
          error: err,
        });
      });
  }

  /**
   *
   *
   * @param {string} module
   * @param {string} req
   * @param {string} id
   * @param {*} options
   * @param {*} event
   * @memberof DatabaseSettingsAdapter
   */
  query_item(
    module: string,
    req: string,
    id: string,
    options: any,
    event: any
  ): void {
    // Eine Query vorbereiten.
    // In Pouch DB ist das Mango-Query.
    interface Options {
      module: string;
    }

    options = {
      module,
    };

    this.db
      .readFromID(id, options)
      // .readFromQuery({ selector: { docType: 'artist' },})
      .then(function handleResult(this: any, result) {
        //* Schicke Daten zurück.
        console.log(result);
        event.reply(IPC_CHANNEL, {
          request: req,
          data: result,
        });
        return result;
      })
      .catch(function handleErrors(err) {
        console.log(err);

        //* Schicke Fehler zurück.
        event.reply(IPC_CHANNEL, {
          request: req,
          error: err,
        });
      });
  }

  /**
   *
   *
   * @param {string} module
   * @param {string} req
   * @param {string} id
   * @param {*} options
   * @param {*} event
   * @memberof DatabaseSettingsAdapter
   */
  query_delete(
    module: string,
    req: string,
    id: string,
    options: any,
    event: any
  ): void {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * @param {string} module
   * @param {string} req
   * @param {string} data
   * @param {*} options
   * @param {*} event
   * @memberof DatabaseSettingsAdapter
   */
  query_create(module: string, req: string, options: any, event: any): void {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @param {string} module
   * @param {string} req
   * @param {string} data
   * @param {*} options
   * @param {*} event
   * @memberof DatabaseSettingsAdapter
   */
  query_update(
    module: string,
    req: string,
    data: string,
    options: any,
    event: any
  ): void {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @param {string} module
   * @param {string} req
   * @param {*} options
   * @param {*} event
   * @memberof DatabaseSettingsAdapter
   */
  create_object(module: string, req: string, options: any, event: any): void {
    throw new Error('Method not implemented.');
  }
}
