import { User } from "../../server/models";

declare namespace Express {
  interface Request {
    user: User;
  }
}
