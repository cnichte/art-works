/* eslint-disable no-unused-vars */

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @export
 * @interface DatabaseCRUDI
 */
export interface DatabaseCRUDI {
  initialize(exampleData: boolean, createViews: boolean): Promise<any | null>;

  //* CRUD: Create, Read, Update and Delete from Database.
  create(data: any): Promise<any>;

  readFromQuery(query: Object): Promise<any>;
  readFromID(uuid: string, options: any): Promise<any>;
  readFromRelations(type: string, options: Object): Promise<any>;
  readFromRelationsID(type: string, id: string): Promise<any>;

  update(type: string, data: any): Promise<any>;

  delete(type: string, data: any): Promise<any>;
  deleteAll(): Promise<any>;

  // special Addition
  objectFactory(the_type: string): Promise<any>;

  addAttachment(
    type: string,
    data: any,
    attachmentId: string,
    attachment: any,
    attachmentType: string
  ): Promise<any>;
  getAttachment(
    type: string,
    docId: string,
    attachmentId: string
  ): Promise<any>;

  removeAttachment(type: string, data: any, attachmentId: string): Promise<any>;
}
