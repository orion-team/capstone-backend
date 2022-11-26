import express from "express";
import { Express } from "express";
import session from "express-session";
import { authNMiddleware } from "./middleware";
import { api } from "./routes";

export class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;
    this.app.use(express.json());

    this.app.use(
      session({
        secret: process.env.SESSION_SECRET ?? "",
        resave: false,
        saveUninitialized: true,
      })
    );

    this.app.use(authNMiddleware);

    this.app.use("/api", api);
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}! 🚀🚀🚀`)
    );
  }
}
