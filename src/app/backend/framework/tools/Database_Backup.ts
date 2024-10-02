import dayjs from "dayjs";
import { FileTool } from "./FileTool";
import { zip } from "zip-a-folder";

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export class Database_Backup {
  static perform(databasename: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log("performing Database_Backup");

      const catalogs_path: string = FileTool.get_app_catalogs_path();
      const db_path: string = catalogs_path
        .concat(FileTool.path_add_suffix(databasename))
        .concat("database/");
      const backup_path: string = catalogs_path
        .concat(FileTool.path_add_suffix(databasename))
        .concat("backups/");

      FileTool.ensure_path_exist(backup_path);

      const target: string = backup_path
        .concat(`backup-db-${FileTool.path_remove_suffix(databasename)}`)
        .concat("-")
        .concat(dayjs().format("YYYY-MM-DD HH-mm-ss-SSS"))
        .concat(".zip");

      console.log("catalogs_path", catalogs_path);
      console.log("db_path", db_path);
      console.log("backup", target);

      if (FileTool.path_exist(db_path)) {
        console.log("db_path exists", db_path);
        zip(db_path, target)
          .then(function (response) {
            console.log(response);
            return resolve(true);
          })
          .catch(function (err) {
            return reject(err);
          });

        console.log(`Backup angelegt:${target}`);
        resolve(true);
      } else {
        console.log("db_path doesnt exists", db_path);
        reject(`db_path ${db_path} doesnt exists.`);
      }

      resolve(true);
    });
  }
}
