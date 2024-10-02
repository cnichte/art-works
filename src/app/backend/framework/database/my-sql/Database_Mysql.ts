import mysql, { ConnectionOptions } from "mysql2/promise";
import { DatabaseCRUD_Interface } from "../../../framework/types/Database_Types";
import { DB_Request, DB_RequestData } from "../../../../common/framework/types/system/RequestTypes";

/**
 * https://evertpot.com/executing-a-mysql-query-in-nodejs/
 * https://sidorares.github.io/node-mysql2/docs
 * 
 * ! https://adityawiguna.medium.com/connect-mysql-database-from-electron-application-f050be5dda26
 * https://www.youtube.com/watch?v=gKW_svK9-sI
 * 
 * sqlite https://www.youtube.com/watch?v=c76FTxLRwAw
 */
export class Database_Mysql implements DatabaseCRUD_Interface {
  constructor() {}
  initialize(exampleData: boolean, createViews: boolean): Promise<any | null> {
    throw new Error("Method not implemented.");
  }
  create(data: any, use_relation: boolean): Promise<any> {
    throw new Error("Method not implemented.");
  }
  read(props: DB_Request): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(props: DB_RequestData<any>): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(props: DB_RequestData<any>): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete_all(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  export_all(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }


  public async test(): Promise<mysql.Connection> {
    let connection;

    try {
      const access: ConnectionOptions = {
        host: "192.168.178.91", // Port 3306 is default
        user: "user",
        password: 'password',
        database: "mydatabase",
      };

      connection = await mysql.createConnection(access);

      const [results, fields] = await connection.query(
        "SELECT * FROM `projects`"
      );

      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
      console.log('########## ERROR: ', err);
    }

    return connection;
  }
}
