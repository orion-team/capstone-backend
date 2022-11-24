import mysql from "mysql";
import fs from "fs";
import path from "path";
const connectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
export class DBConnection {
  private connection: mysql.Connection;

  constructor() {
    if (process.env.DB_PORT) {
      connectionOptions["port"] = process.env.DB_PORT;
    }

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
    if (!this.connection) {
      this.connection = mysql.createConnection(connectionOptions);
    }

    this.connection.connect((err) => {
      if (err) {
        console.error(err);
      }
    });

    return this.connection;
  }

  public end() {
    if (this.connection) {
      this.connection.end((err) => {
        if (err) {
          console.log(err.message);
        }
      });

      this.connection = null;
    }
  }
}

const db = new DBConnection();
export default db;
