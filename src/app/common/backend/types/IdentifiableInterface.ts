/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */

/**
 * Diese beiden Properties kommen aus der PouchDB Datenbank.
 *
 * @export
 * @interface IdentifiableI
 */
export interface IdentifiableI {
  id: string;
  ref: string;
}
