import mysql from "mysql";
import { NextFunction, Request, Response } from "express";
import { routes } from "../models";
import db from "../DBConnection";

const queryUserGet = (uuid: string) => `
SELECT BIN_TO_UUID(id) as uuid, email, name, picture FROM user WHERE id=UUID_TO_BIN(${mysql.escape(
  uuid
)})
`;

export const authNMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { path, session } = req;

  if (routes.protected.has(path)) {
    if (session?.userId) {
      const userResults = await db.query(queryUserGet(session.userId));

      if (userResults.length === 0) {
        res.status(401).end();
      } else {
        const [user] = userResults;
        req["user"] = user;
      }

      next();
    } else {
      res.status(401).end();
    }
  } else {
    next();
  }
};
