import mysql, { ConnectionOptions } from "mysql2/promise";
import { DatabaseCRUD_Interface, Query_Props } from "../../types/Database_Types";

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
  read(props: Query_Props): Promise<any> {
    throw new Error("Method not implemented.");
  }
  readFromID(props: Query_Props): Promise<any> {
    throw new Error("Method not implemented.");
  }
  export_all(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  initialize(exampleData: boolean, createViews: boolean): Promise<any> {
    throw new Error("Method not implemented.");
  }
  create(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  readFromQuery(query: Object): Promise<any> {
    throw new Error("Method not implemented.");
  }
  readFromRelationsID(type: string, id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(type: string, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(type: string, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteAll(): Promise<any> {
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
