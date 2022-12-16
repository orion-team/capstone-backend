import { NextFunction, Request, Response } from "express";
import { routes, User } from "../models";
import db from "../DBConnection";
import { queryUserGetByUUID } from "../queries";

export const authNMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { path, session } = req;

  if (routes.protected.has(path)) {
    if (session?.userId) {
      const userResults = await db.query<User>(
        queryUserGetByUUID(session.userId)
      );

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
