/* eslint-disable no-unused-vars */

import { DB_Request, DB_RequestData } from "../../../common/framework/types/system/RequestTypes";

export interface QueryAble {
  query?: any;
}

export interface RelationalQueryAble {
  type?: string;
  id?: string;
  options?: Object;
  use_relation?: boolean;
}

export interface Query_Props extends QueryAble, RelationalQueryAble {
  query?: any;

  type?: string;
  id?: string;
  options?: Object;
  use_relation?: boolean;
}

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 *
 * @export
 * @interface DatabaseCRUD_Interface
 */
export interface DatabaseCRUD_Interface {
  initialize(exampleData: boolean, createViews: boolean): Promise<any | null>;

  //* CRUD: Create, Read, Update and Delete from Database.
  create(props: DB_RequestData<any>): Promise<any>;

  read(props: DB_Request): Promise<any>;

  update(props: DB_RequestData<any>): Promise<any>;
  delete(props: DB_RequestData<any>): Promise<any>;

  delete_all(): Promise<any>;
  export_all(): Promise<boolean>;
}

export interface DatabasePouchDB_Interface extends DatabaseCRUD_Interface {
  // special Addition
  objectFactory(the_type: string): Promise<any>;

  getAttachment(
    type: string,
    docId: string,
    attachmentId: string
  ): Promise<any>;
}
