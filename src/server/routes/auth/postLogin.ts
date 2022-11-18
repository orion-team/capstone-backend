import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { OAuth2Client, TokenPayload } from "google-auth-library";

const client = new OAuth2Client(process.env.CLIENT_ID);

export const postLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, email, picture }: TokenPayload = ticket.getPayload();

  // TODO replace with user id from database
  req.session["email"] = email;
  req.session["name"] = name;

  res.status(200).json({
    name,
    email,
    picture,
  });
};
