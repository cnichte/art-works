/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import { app } from 'electron';
import fs from 'fs-extra';
import { DatabaseCRUDI } from '../common/backend/types/DatabaseCRUDInterface';
// import { Job, WordpressToMarkdown } from '../modules/catalogs/backend/transformers/wordpress-to-markdown/WordpressToMarkdown';
import { PathLike } from 'fs';

/**
 * Das ist eine 'Datenbank', für die setting.json Datei.
 * Einfach nur, um alles einheitlich zu gestalten.
 *
 * @export
 * @class DatabaseSettings
 * @implements {DatabaseCRUDInterface}
 */
export class DatabaseSettings implements DatabaseCRUDI {
  appHome: string = '';

  appDir: string = '';

  settingsFile: string = '';

  settings: any = {};

  /**
   * Creates an instance of DatabaseSettings.
   * @param {string} appName
   * @param {string} appHome
   * @memberof DatabaseSettings
   */
  constructor(appName: string, appHome: string) {
    this.appHome = appHome;
    const userHome = app.getPath('home');

    console.log('######################################################\n\n');
    console.log(`Load Settings:`);
    console.log('------------------------------------------------------');
    console.log(`---------- User Home-Verzeichnis: ${userHome}`);

    this.settingsFile = `${this.appHome}/settings.json`;

    //* check if directory exists
    if (fs.existsSync(this.appHome as PathLike)) {
      console.log(`---------- App Directory exists: ${this.appHome}`);

      //* Settings File exist
      fs.readFile(this.settingsFile as PathLike, 'utf8', (err: any, jsonString: any) => {
        if (err) {
          console.log('---------- Settings File read failed:', err);
          // TODO Rechte etc.
          return;
        }
        console.log('---------- Settings:', jsonString);
        this.settings = JSON.parse(jsonString);
      });

      // TODO Settings File not exist
    } else {
      console.log(`---------- App Directory not found: ${this.appHome}`);

      fs.ensureDirSync(this.appHome);

      // TODO Ich brauche einen Setup-Manager.
      // TODO FirstStart Dialog at first launch ...
      // TODO die settings-schnippsel aus den Modulen zusammen setzen.
      this.settings = {
        catalogStartOptionsSelected: '98673942-8fd5-4d9e-82c3-e24ddf03d9f3',
        catalogStartOptions: [
          {
            name: 'Öffnet einen bestimmten Katalog',
            id: '98673942-8fd5-4d9e-82c3-e24ddf03d9f3',
          },
          {
            name: 'Öffnet den zuletzt verwendeten Katalog',
            id: '98673942-8fd5-4d9e-82c3-e24ddf03d9f3',
          },
          {
            name: 'Zeigt den Auswahl Dialog',
            id: '335889f5-b05c-4f73-9b4e-403e4bf632a7',
          },
        ],
        openCatalogOnStartup: '4f44e5f7-3e11-43d9-aed5-0c2b9633a64f',
        catalogs: [
          {
            id: '4f44e5f7-3e11-43d9-aed5-0c2b9633a64f',
            templateName: 'Werkverzeichnis Carsten Nichte',
            templateDescription: 'Das ist mein Standard Katalog',
            dbHost: '192.168.178.76',
            dbPort: '5984',
            dbName: 'werkverzeichnis',
            dbUser: 'admin',
            dbPassword: 'adminadmin',
            dbTemplate:
              'http://${database.user}:${database.password}@${database.host}:${database.port}/',
          },
        ],
      };

      // create settings File
      fs.writeFile(
        this.settingsFile as PathLike,
        JSON.stringify(this.settings),
        (err: any) => {
          if (err) console.log('---------- Error writing file:', err);
        }
      );
    }
  }

  /**
   *
   *
   * @param {boolean} exampleData
   * @param {boolean} createViews
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  initialize(exampleData: boolean, createViews: boolean): Promise<any> {
    // Hier gibt es gerade nix zu tun.
    return null;
  }

  /**
   * Datensatz erzeugen.
   * TODO: Das brauche ich.
   *
   * @param {*} data
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  create(data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   ** Hier bilde ich  momentan nur einen Sonderfall ab.
   * Das ist ein bisschen kompliziert gelöst, weil ich die Ergebnisse in der selben Form
   * zurücklieferen will wie die PouchDB bzw relational-pouch.
   * Dann brauch ich die Unterschiede nicht im Frontend behandeln.
   *
   * @param {any} query
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  readFromQuery(query: any): Promise<any> {
    // In den Fall ist die query das Property im settings Objekt.
    return new Promise<Object>((resolve, reject) => {
      if ('module' in query) {
        if (query.module in this.settings) {

          const result:any = {};
          result[`${query.module}`] = this.settings[`${query.module}`];

          resolve(result); // TO Catalogs = "module"

        } else {
          reject('Daten nicht gefunden.'); // TODO  Hier ein ERROR Objekt benutzen
        }
      } else {
        reject('Property "module" nicht vorhanden.');
      }
    });
  }

  /**
   * Private Hilfsmethode um ein Objekt in einer Liste zu finden.
   *
   * @param {Array<any>} myList
   * @param {string} id
   * @return {*}  {*}
   * @memberof DatabaseSettings
   */
  findOjectIn(myList: Array<any>, id: string): any {
    console.log(`DatabaseSettingsAdapter.findOjectIn ${id}`);
    for (let i = 0; i < myList.length; i++) {
      const elm = myList[i];
      console.log(elm);
      if (elm.id === id) {
        return elm;
      }
    }

    return null;
  }

  /**
   ** Hier bilde ich momentan nur einen Sonderfall ab.
   * Das ist ein bisschen kompliziert gelöst, weil ich die Ergebnisse in der selben Form
   * zurücklieferen will wie die PouchDB bzw relational-pouch.
   * Dann brauch ich die Unterschiede nicht im Frontend behandeln.
   *
   * @param {string} uuid
   * @param {*} options
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  readFromID(uuid: string, options: any): Promise<any> {
    return new Promise<Object>((resolve, reject) => {
      if ('module' in options) {
        if (options.module in this.settings) {

          const obj = this.findOjectIn(this.settings[options.module], uuid);
          const result:any = {};

          if (obj != null) {
            result[`${options.module}`] = [obj];
          } else {
            result[`${options.module}`] = [];
          }

          resolve(result);
        } else {
          reject(`Das Property ${options} gibts nicht in den Settings`); // TODO  Hier ein ERROR Objekt benutzen
        }
      } else {
        reject('Property module nicht vorhanden.');
      }
    });
  }

  /**
   *
   *
   * @param {string} type
   * @param {Object} options
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  readFromRelations(type: string, options: Object): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @param {string} type
   * @param {string} id
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  readFromRelationsID(type: string, id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @param {string} type
   * @param {*} data
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  update(type: string, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @param {string} type
   * @param {*} data
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  delete(type: string, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  deleteAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @param {string} type
   * @param {*} data
   * @param {string} attachmentId
   * @param {*} attachment
   * @param {string} attachmentType
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  addAttachment(type: string, data: any, attachmentId: string, attachment: any, attachmentType: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @param {string} type
   * @param {string} docId
   * @param {string} attachmentId
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  getAttachment(type: string, docId: string, attachmentId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @param {string} type
   * @param {*} data
   * @param {string} attachmentId
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  removeAttachment(type: string, data: any, attachmentId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   *
   * @param {string} the_type
   * @return {*}  {Promise<any>}
   * @memberof DatabaseSettings
   */
  objectFactory(the_type: string): Promise<any> {
    throw new Error('Method not implemented.');
  }


}
