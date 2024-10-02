import dayjs from "dayjs";
import { FileTool } from "./FileTool";
import fs from "fs-extra";

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export class Database_Export {
  static perform(databasename: string, json_doc: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log("performing Database_Export");

      const catalogs_path: string = FileTool.get_app_catalogs_path();
      const export_path: string = catalogs_path
        .concat(databasename)
        .concat("exports/");

      FileTool.ensure_path_exist(export_path);

      const target: string = export_path
        .concat(`export-db-${FileTool.path_remove_suffix(databasename)}`)
        .concat("-")
        .concat(dayjs().format("YYYY-MM-DD HH-mm-ss-SSS"))
        .concat(".json");

      console.log("catalogs_path", catalogs_path);
      console.log("db_path", export_path);
      console.log("export", target);

      if (FileTool.path_exist(export_path)) {
        console.log("db_path exists", export_path);

        fs.outputJson(target, json_doc, { spaces: 4 })
          .then(() => {
            resolve(true);
          })
          .catch(function (error: any) {
            reject(error);
          });

        resolve(true);
      } else {
        console.log("db_path doesnt exists", export_path);
        reject(`db_path doesnt exists ${export_path}`);
      }

      resolve(true);
    });
  }
}
