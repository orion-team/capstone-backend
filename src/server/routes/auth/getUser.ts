import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401);
  }
};
