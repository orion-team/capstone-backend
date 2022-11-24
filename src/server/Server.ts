import express from "express";
import { Express } from "express";
import session from "express-session";
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

    // TODO clean up and extract to separate file
    this.app.use(async (req, res, next) => {
      const { path, session } = req;
      // TODO extract constant

      console.log(path);
      if (
        path === "/api/auth/login" ||
        path === "/api/search" ||
        path === "/api/favorite" ||
        path.includes("/api/api-docs")
      ) {
        next();
      } else {
        if (session?.email) {
          // TODO integrate with database
          const {
            session: { email, name },
          } = req;

          req["user"] = {
            email,
            name,
          };

          next();
        } else {
          res.status(401);
          res.end();
        }
      }
    });

    this.app.use("/api", api);
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening on port ${port}! 🚀🚀🚀`)
    );
  }
}
