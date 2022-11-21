import mysql from "mysql";
import fs from "fs";
import path from "path";

export class DBConnection {
  private connection: mysql.Connection;

  constructor() {
    const connectionOptions = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
    if (process.env.DB_PORT) {
      connectionOptions["port"] = process.env.DB_PORT;
    }
    this.connection = mysql.createConnection(connectionOptions);
    this.connect();

    const createSQLQueries = fs
      .readFileSync(path.join(__dirname, "/init.sql"))
      .toString();

    const queriesArr = createSQLQueries
      .split(");")
      .filter((str) => /\s/.test(str))
      .map((str) => `${str});`);

    for (const query of queriesArr) {
      this.connection.query(query, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    this.end();
  }

  public connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  public getConnection() {
    return this.connection;
  }

  public end() {
    this.connection.end((err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }
}

const db = new DBConnection();
export default db;
