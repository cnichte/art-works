import path from 'path';
import { app } from 'electron';
import log from 'electron-log';

import { AppBackend } from './backend/AppBackend';
import { MyAppInfo } from './MyAppInfo';

/**
 *
 * @export
 * @class MyAppMain
 */
export class MyAppMain {

  public static getAppBackend(): AppBackend {
    return new AppBackend(MyAppInfo.MY_APP_FOLDER, MyAppMain.getAppHomePath());
  }

  public static getAppHomePath(): string {
    return `${app.getPath('home')}/.${MyAppInfo.MY_APP_FOLDER}/`;
  }

  public static getLogfileName(): string {
    return 'logs/artworks.log';
  }

  public static initLogger() {
    // spyRendererConsole collects logs written by console.log in the renderer process
    log.initialize({ preload: true, spyRendererConsole: true });
    log.transports.console.format = '{h}:{i}:{s} {text}';
    log.transports.file.resolvePathFn = () =>
      path.join(MyAppMain.getAppHomePath(), MyAppMain.getLogfileName());
  }
}
