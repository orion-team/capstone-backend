import { User } from "src/server/models";

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
  interface Request {
    user: User;
  }
}

declare module "express" {
  interface Request {
    user: User;
  }
}
