import mysql from "mysql";
import fs from "fs";
import path from "path";

export class DBConnection {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // create tables if not exist

    // TODO uncomment when ready
    /* 

    this.connect();
    const createSQLQueries = fs
      .readFileSync(path.join(__dirname, "/init.sql"))
      .toString();

     this.connection.query(createSQLQueries, (err) => {
      if (err) {
        console.error(err);
      }
    });


    // TODO - check if needs to end
    this.end();
      */
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
