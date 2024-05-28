/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { ipcMain } from 'electron';

// import MyAppModuleRegistryBackend from '../MyAppModuleRegistryBackend';
import { DatabasePouchDBAdapter } from './DatabasePouchDBAdapter';
import DatabaseSettingsAdapter from './DatabaseSettingsAdapter';
import { DatabaseAdapterI } from '../common/backend/types/DatabaseAdapterInterface';
// import { Job, WordpressToMarkdown } from '../modules/catalogs/backend/transformers/wordpress-to-markdown/WordpressToMarkdown';

/**
 * Datei: /src/app/backend/backend_main.ts
 *
 * Das ist das Backend meiner Applikation.
 * Wird in der Electron-Boilerplate in /src/main/main.ts aufgerufen.
 *
 * Hier empfange ich Anforderungen vom Frontend, stelle die Daten zusammen
 * und liefere das Ergebnis zurück.
 *
 * Es gibt drei Quellen für Daten:
 *
 * - Die Datenbank
 * - Die Settings-Datei
 * - Transport-Aufträge (Import, Export / Daten-Transformation)
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 *
 * @export
 * @class AppBackend
 */
export class AppBackend {
  appName: string = '';

  appHomePath: string = '';

  dbSettingsAdapter: DatabaseAdapterI;

  dbCatalogsAdapter: DatabaseAdapterI;

  // modulesRegistryBackend: MyAppModuleRegistryBackend;

  /**
   * Creates an instance of AppBackend.
   *
   * Setup of the application at first startup.
   * https://stackoverflow.com/questions/21194934/how-to-create-a-directory-if-it-doesnt-exist-using-node-js
   * https://heynode.com/tutorial/readwrite-json-files-nodejs/
   * https://www.nearform.com/blog/adding-a-permission-system-to-node-js/
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   *
   * @memberof AppBackend
   */
  constructor(appName: string, appHomePath: string) {
    this.appName = appName;
    this.appHomePath = appHomePath;
    console.log(
      `---------- init ${this.appName}, with home ${this.appHomePath}.`
    );

    // this.modulesRegistryBackend = new MyAppModuleRegistryBackend();

    this.dbSettingsAdapter = new DatabaseSettingsAdapter( this.appHomePath, this.appName ); // true

    //! create exampledata, create views
    this.dbCatalogsAdapter = new DatabasePouchDBAdapter( this.appHomePath, false, false ); // true
  }

  /**
   * Manage Requests.
   *
   * Die Kommunikation zwischen Frontend und Backend läuft über Electrons IPC Protokoll.
   *
   * https://www.electronjs.org/de/docs/latest/tutorial/ipc
   *
   * Der Auslöser sitzt immer im Frontend (geht aber auch anders herum).
   * Dort wird etwas aus dem Backend angefordert.
   * ZB: Schicke mir bestimmte Daten, oder speichere die Daten die ich mit übergebe irgendwo ab.
   * Das Backend kann also nur eine Anforderung erhalten, und ein Ergebnis zurücksenden.
   *
   * Ich hab mir drei Kanäle aufgebaut:
   *
   * ipc-database
   * ipc-settings
   * ipc-transform
   *
   * Es gibt ein Beispiel in der Boilerplate.
   * Suche nach ping, oder pong oder ipc-example,
   * um an die Codeschnipsel zu kommen.
   *
   * @memberof AppBackend
   */
  handle_IPC() {
    // Listen for events from frontends render process...
    //* Empfange hier im Backend die Anforderung vom Frontend:
    // TODO: Die Channels aus den Adaptern holen.
    ipcMain.on('ipc-database', async (event, arg) => {
      console.log('\n\n######################################################');
      console.log(`Empfange DB Request vom Frontend:`, arg);
      console.log('------------------------------------------------------');

      //* arg[0] enthält immer den Request-String.
      //* arg[1] enthält immer Daten oder eine ID.
      //* arg[2] enthält optionale Options (query)  oder Attachments

      if (arg.length === 2) arg.push({}); // Options fehlen.

      // Request-Dispatcher
      this.dbCatalogsAdapter.dispatch(arg[0], arg[1], arg[2], event);

      console.log('######################################################\n\n');
    });

    ipcMain.on('ipc-settings', async (event, arg) => {
      console.log('\n\n######################################################');
      console.log(`Empfange Settings Request vom Frontend:`, arg);
      console.log('------------------------------------------------------');

      //* arg[0] enthält immer den Request-String.
      //* arg[1] enthält immer Daten oder eine ID.
      // Request-Dispatcher
      this.dbSettingsAdapter.dispatch(arg[0], arg[1], arg[2], event);

      console.log('######################################################\n\n');
    });

    ipcMain.on('ipc-transform', async (event, arg) => {
      console.log('\n\n######################################################');
      console.log(`Empfange Settings Request vom Frontend:`, arg);
      console.log('------------------------------------------------------');

      //* arg[0] enthält immer den Request-String.
      //* arg[1] enthält immer Daten oder eine ID.
      // Request-Dispatcher

      // const job: Job = {
      //  sourceFile: `${this.appDir}/notes.xml`,
      //  targetFolder: `${this.appDir}/output/`,
      // };
      // TODO  WordpressToMarkdown.perform(job);

      event.reply('ipc-transform', {
        request: arg[0],
        data: 'HIER KOMMT DAS ERGEBNIS REIN',
      });

      console.log('######################################################\n\n');
    });
  }

  /**
   *
   *
   * @return {*}
   * @memberof AppBackend
   */
  getAppName() {
    return `Hello, this is ${this.appName}, greeting from the Backend.`;
  }
}
