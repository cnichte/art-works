import { ReactElement } from 'react';
import ApplicationRoutes from './frontend/myApplicationRoutes';

/**
 *
 *
 * @export
 * @class MyAppMain
 */
export default class MyAppRenderer {
  public static getAppFrontend(): ReactElement {
    return <ApplicationRoutes />;
  }
}
