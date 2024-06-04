import path from 'path';
import { app } from 'electron';
import log from 'electron-log';

import { AppBackend } from './backend/AppBackend';

/**
 *
 * @export
 * @class MyAppMain
 */
export default class MyAppMain {

  static MY_APP_NAME = 'Art.Works!';

  public static getAppBackend(): AppBackend {
    return new AppBackend(MyAppMain.MY_APP_NAME, MyAppMain.getAppHomePath());
  }

  public static getAppHomePath(): string {
    return `${app.getPath('home')}/.${MyAppMain.MY_APP_NAME}/`;
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
