/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @export
 * @interface DatabaseAdapterI
 */
export interface DatabaseAdapterI {
  dispatch(request: string, data: any, options: any, event: any): void;

  query(        module: string, req: string, options: any, event: any): void;

  query_list(   module: string, req: string, options: any, event: any): void;
  query_item(   module: string, req: string, id: string, options: any, event: any): void;
  query_delete( module: string, req: string, id: string, options: any, event: any): void;
  query_create( module: string, req: string, data: any, options: any, event: any): void;
  query_update( module: string, req: string, data: any, options: any, event: any): void;
  create_object(module: string, req: string, options: any, event: any): void;
}
