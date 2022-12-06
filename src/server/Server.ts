import express from "express";
import { Express } from "express";
import session from "express-session";
import path from "path";
import db from "./DBConnection";
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

    const staticOptions = {
      maxAge: "30 days",
      setHeaders: (res, path) => {
        if (express.static.mime.getType(path) === "text/html") {
          // Skip cache on html to load new builds.
          res.setHeader("Cache-Control", "public, max-age=0");
        }
      },
    };

    this.app.use(
      "/",
      () => {},
      express.static(path.join(__dirname, "..", "public"), staticOptions)
    );

    this.app.use(
      "/*",
      express.static(path.join(__dirname, "..", "public"), staticOptions)
    );
  }

  public async start(port: number): Promise<void> {
    try {
      await db.initialize();
      this.app.listen(port, () =>
        console.log(`Server listening on port ${port}! 🚀🚀🚀`)
      );
    } catch (error) {
      console.error(error);
    }
  }
}
