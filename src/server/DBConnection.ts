import mysql from "mysql";
import fs from "fs";
import path from "path";

const connectionOptions = {
  host: process.env.DB_HOST,
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
  private connection: mysql.Connection | null;
  private static initialized = false;

  constructor() {}

  public async initialize() {
    if (DBConnection.initialized) {
      return;
    }

    if (process.env.DB_PORT) {
      connectionOptions["port"] = process.env.DB_PORT;
    }

    await this.connect();
    const queryPromises = initSQLQueriesArr.map(
      (query) =>
        new Promise((resolve, reject) => {
          this.connection.query(query, (err, results) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        })
    );

    for await (const query of queryPromises) {
      try {
        await query;
      } catch (error) {
        console.log(error);
        break;
      }
    }
    await this.end();

    DBConnection.initialized = true;
  }

  public async connect(): Promise<mysql.Connection> {
    if (!this.connection) {
      this.connection = mysql.createConnection(connectionOptions);
    }

    return await new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(this.connection);
        }
      });
    });
  }

  public async end(): Promise<null> {
    if (this.connection) {
      return new Promise((resolve, reject) => {
        this.connection.end((err) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            this.connection = null;
            resolve(this.connection);
          }
        });
      });
    }
  }

  public async query(queryStr: string): Promise<mysql> {
    await this.connect();
    const results = await new Promise((resolve, reject) => {
      this.connection.query(queryStr, (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    await this.end();

    return results;
  }
}

const db = new DBConnection();
export default db;
