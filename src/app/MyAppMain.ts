import path from 'path';
import { app } from 'electron';

import { AppBackend } from './backend/AppBackend';

const MY_APP_NAME = 'Art.Works';

/**
 *
 *
 * @export
 * @class MyAppMain
 */
export default class MyAppMain {
  public static getAppBackend(): AppBackend {
    return new AppBackend(MY_APP_NAME, MyAppMain.getAppHomePath());
  }

  public static getAppHomePath(): string {
    return `${app.getPath('home')}/.${MY_APP_NAME}/`;
  }

  public static getLogfileName(): string {
    return 'logs/artworks.log';
  }

  public static initLogger(log: any) {
    // spyRendererConsole collects logs written by console.log in the renderer process
    log.initialize({ preload: true, spyRendererConsole: true });
    log.transports.console.format = '{h}:{i}:{s} {text}';
    log.transports.file.resolvePathFn = () =>
      path.join(MyAppMain.getAppHomePath(), MyAppMain.getLogfileName());
  }
}
