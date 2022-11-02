import mysql from "mysql";
// import fs from "fs";
// import path from "path";

export class DBConnection {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    this.connection.connect((err) => {
      console.error(err);
    });

    // create tables if not exist

    // TODO uncomment when ready
    /* 
    const createSQLQueries = fs
      .readFileSync(path.join(__dirname, "/init.sql"))
      .toString();
    const queriesArr = createSQLQueries
      .split(");")
      .filter((str) => /\s/.test(str));

      */

    this.end();
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
