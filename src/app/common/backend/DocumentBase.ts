/* eslint-disable import/no-cycle */
/* eslint-disable no-prototype-builtins */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line no-restricted-syntax

import dayjs from 'dayjs';
import { DatabaseCRUDI } from "./types/DatabaseCRUDInterface";

/**
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @export
 * @class DocumentBase
 */
export class DocumentBase {
  //! Test
  static createInstance<A extends DocumentBase>(C: new (...args: any) => A): A {
    return new C();
  }

  /**
   ** Transportiert die JSON-Example-Daten, und speichert sie in der Datenbank.
   * Aufgabe: Die Datenbank intial befüllen.
   * Dazu verwende ich json Dokumente im Filesystem.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @static
   * @param {*} packageObj - Das geladene Json-Objekt
   * @param {*} obj - Das Zielobjekt das in die Dateenbank kommt
   * @param {DatabaseCRUDI} database - Die Datenbank
   * @memberof DocumentBase
   */
  static transportAndPersist(
    packageObj: any,
    obj: any,
    database: DatabaseCRUDI
  ) {
    for (const key in packageObj) {
      // console.log(`Key: ${key} -> ${packageObj[key]}`);
      if (packageObj.hasOwnProperty(key)) {
        obj[key] = packageObj[key] as string;
      }
    }

    if (!obj.hasOwnProperty('dateCreated')) {
      obj.dateCreated = dayjs().format('YYYY-MM-DD HH:mm');
    }

    if (!obj.hasOwnProperty('dateModified')) {
      obj.dateModified = dayjs().format('YYYY-MM-DD HH:mm');
    }

    database
      .create(obj.toJson())
      .then(function handleResult() {
        console.log('------ CREATED DOC', obj);
        return obj;
      })
      .catch(function handleError(err: any) {
        console.log('------ CREATED DOC NOT', obj);
        console.info(err);
      });
  }

  /**
   *
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @static
   * @param {string} jsonString
   * @return {*}  {Object}
   * @memberof DocumentBase
   */
  public static JsonStringToJsonObject(jsonString: string): Object {
    return JSON.parse(jsonString);
  }

  /**
   *
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @static
   * @param {Object} obj
   * @return {*}  {string}
   * @memberof DocumentBase
   */
  public static ObjectToString(obj: Object): string {
    return JSON.stringify(obj);
  }

  /**
   *
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @static
   * @param {Object} obj
   * @return {*}  {string}
   * @memberof DocumentBase
   */
  public static makeJsonObjectfromObject(obj: Object): string {
    return JSON.parse(JSON.stringify(obj));
  }
}
