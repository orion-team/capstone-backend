import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  if (req.user) {
    const { name, email, picture } = req.user;
    res.status(200).json({
      name,
      email,
      picture,
    });
  } else {
    res.status(401);
  }
};
