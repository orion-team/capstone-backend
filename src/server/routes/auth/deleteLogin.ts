import { Request, Response } from "express";

export const deleteLogin = async (req: Request, res: Response) => {
  await new Promise((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) {
        reject(error);
      } else {
        resolve(undefined);
      }
    });
  });

  res.status(200);
  res.json({
    message: "Logged out successfully",
  });
};
