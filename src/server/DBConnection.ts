import mysql from "promise-mysql";
import fs from "fs";
import path from "path";

const env = process.env.ENV;

const connectionOptions = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const initSQLQueries = fs
  .readFileSync(path.join(__dirname, "/init.sql"))
  .toString();

const initSQLQueriesArr = initSQLQueries
  .split(");")
  .filter((str) => /\s/.test(str))
  .map((str) => `${str});`);

export class DBConnection {
  private connection: mysql.Pool | null;
  private static initialized = false;

  constructor() {}

  public async initialize() {
    if (DBConnection.initialized) {
      return;
    }

    if (process.env.DB_PORT) {
      connectionOptions["port"] = process.env.DB_PORT;
    }

    if (env === "PROD") {
      connectionOptions[
        "socketPath"
      ] = `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`;
    } else {
      connectionOptions["host"] = process.env.DB_HOST;
    }

    this.connection = await mysql.createPool(connectionOptions);

    const queryPromises = initSQLQueriesArr.map((query) =>
      this.connection.query(query)
    );

    for await (const query of queryPromises) {
      try {
        await query;
      } catch (error) {
        console.log("Query error: ", error);
        break;
      }
    }
    DBConnection.initialized = true;
  }

  public async query<T>(queryStr: string): Promise<T[]> {
    const results = await this.connection.query(queryStr);
    return results;
  }
}

const db = new DBConnection();
export default db;
