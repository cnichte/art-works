import { IPC_Channels } from "../types/IPC_Channels";

import {
  RequestsListI,
  RequestViewI,
  RequestsFormI,
  ListOperation,
  ViewOperation,
  FormOperation,
} from './types/RequestsFactoryTypes';

/**
 * Assembles request strings according to a standardized procedure.
 *
 * A. Requests for lists
 * B. Requests for views
 * C. Requests for forms
 *
 * This covers the standards in this application:
 *
 * A. List:
 * 1. Load a bunch of items for the list - possibly filtered, and paged.
 *
 * B. View:
 * 1. load a specific item for the view.
 *
 * C. Form:
 * 1. load existing data for a specific item
 * 2. save changed data from this item
 * 3. create new data-object
 * 4. insert the new data-object
 *
 * This is also called CRUD in Database Context.
 *
 * Format: `request:${theModule}-${theModuleViewType}-${theOperation}`
 *
 * ${theModule} also known as moduleId: address | artist | catalogs ... you name it
 * TODO: ${theTarget}: list | view | form
 * ${theAction}: save | create | get-object | list | delete
 *
 * Besides there is the possibility of CustomRequests.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @export
 * @class RequestFactory
 */
export default class RequestFactory {
  static getListRequestFor(module: string, command: ListOperation): string {
    return `request:${module}-${command}`;
  }

  static getViewRequestFor(module: string, command: ViewOperation): string {
    return `request:${module}-${command}`;
  }

  static getFormRequestFor(module: string, command: FormOperation): string {
    return `request:${module}-${command}`;
  }

  /**
   * Extracts the module from the request string.
   * 
   * The first part in a request is per definition the module:
   * request = 'request:artists-find-custom'
   * module = artists
   * 
   * @param request 
   * @returns 
   */
  static get_module_from_request(request:string){
    const s = request.indexOf(":") + 1;
    const e = request.indexOf("-");
    return request.substring(s, e);
  }

  /**
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @static
   * @param {string} module
   * @param {IPC_Channels} channel
   * @return {*}  {RequestsListInterface}
   * @memberof RequestFactory
   */
  static getListRequestsFor(module: string, channel: IPC_Channels): RequestsListI {
    return {
      channel,
      listData: RequestFactory.getListRequestFor(module, 'list'),
      deleteData: RequestFactory.getListRequestFor(module, 'delete'),
    };
  }

  /**
   *
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @static
   * @param {string} module
   * @param {IPC_Channels} channel
   * @return {*}  {RequestsViewInterface}
   * @memberof RequestFactory
   */
  static getViewRequestsFor(module: string, channel: IPC_Channels): RequestViewI {
    return {
      channel,
      viewData: RequestFactory.getViewRequestFor(module, 'view'),
    };
  }

  /**
   *
   * @param {string} module
   * @param {IPC_Channels} channel
   * @returns - Object
   */
  static getFormRequestsFor(module: string, channel: IPC_Channels): RequestsFormI {
    return {
      channel, // property shorthand for channel: channel
      loadData: RequestFactory.getFormRequestFor(module, 'form'),
      saveData: RequestFactory.getFormRequestFor(module, 'form-save'),
      getObject: RequestFactory.getFormRequestFor(module, 'form-get-object'),
      createData: RequestFactory.getFormRequestFor(module, 'form-create'),
    };
  }
}
