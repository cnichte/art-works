/* eslint-disable no-unused-vars */

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
  create(data: any, use_relation:boolean): Promise<any>;

  // TODO hier baue ich die neue query auf für "mit und ohne" relations.
  read(props: Query_Props): Promise<any>;
  readFromID(props: Query_Props): Promise<any>;

  update(type: string, data: any): Promise<any>;

  delete(type: string, data: any): Promise<any>;
  deleteAll(): Promise<any>;
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
