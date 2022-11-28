import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { queryUserGetByEmail, queryUserInsert } from "../../queries";
import db from "../../DBConnection";

import { errors as errorMessages } from "../../models";

const client = new OAuth2Client(process.env.CLIENT_ID);

export const postLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const {
      name = "",
      email = "",
      picture = "",
    }: TokenPayload = ticket.getPayload();

    if (!email) {
      res.status(404).json({ error: errorMessages[404].user });
    }

    let resultsExistingUser = await db.query(queryUserGetByEmail(email));

    if (
      !Array.isArray(resultsExistingUser) ||
      resultsExistingUser.length === 0
    ) {
      await db.query(queryUserInsert(email, name, picture));
      resultsExistingUser = await db.query(queryUserGetByEmail(email));
    }

    req.session.userId = resultsExistingUser[0].uuid;
    res.status(200).json({
      email,
      name,
      picture,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: errorMessages[500].default });
  }
};
