import dayjs from "dayjs";
import fs from "fs-extra";
import path from "path";

import { DatabaseCRUD_Interface } from "../../framework/types/Database_Types";
import { DatabaseRequestOptionType, DB_RequestData } from "../../../common/framework/types/system/RequestTypes";

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export class DocumentCreator {
  /**
   * Creates Database-Entries from json Documents in filesystem.
   * Die Dokumente müssen in per webpack kopiert werden.
   * Siehe webpack.plugins.ts
   *
   * @param database
   * @param path_to_jsonfile ./docs-json/address.json
   * @param TCreator
   */
  static loadTo<T>(
    database: DatabaseCRUD_Interface,
    path_to_jsonfile: string,
    TCreator: new () => T,
    request_options: DatabaseRequestOptionType[]
  ): void {
    const pathtofile = path.resolve(__dirname, path_to_jsonfile);
    console.log(pathtofile);

    fs.readJson(pathtofile)
      .then((packageObj: any): any => {
        for (const i in packageObj) {
          const obj = new TCreator();
          // obj.id = uuidv4(); // relational-pouchignores this
          // und ab in die Datenbank
          DocumentCreator.transportAndPersist(
            packageObj[i],
            obj,
            database,
            request_options
          );
        }
        return null;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  static transportAndPersist(
    packageObj: any,
    obj: any,
    database: DatabaseCRUD_Interface,
    request_options: DatabaseRequestOptionType[]
  ) {
    for (const key in packageObj) {
      // console.log(`Key: ${key} -> ${packageObj[key]}`);
      if (packageObj.hasOwnProperty(key)) {
        obj[key] = packageObj[key] as string;
      }
    }

    if (!obj.hasOwnProperty("dateCreated")) {
      obj.dateCreated = dayjs().format("YYYY-MM-DD HH:mm");
    }

    if (!obj.hasOwnProperty("dateModified")) {
      obj.dateModified = dayjs().format("YYYY-MM-DD HH:mm");
    }

    let request: DB_RequestData<any> = {
      data: obj,
      request_type: "request:create",
      doctype: obj.docType,
      request_options:[...request_options]
    };

    database
      .create(request) // DocumentCreator.makeJsonObjectfromObject(obj)
      .then(function handleResult() {
        console.log("------ CREATED DOC", obj);
        return obj;
      })
      .catch(function handleError(err: any) {
        console.log("------ CREATED DOC NOT", obj);
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
