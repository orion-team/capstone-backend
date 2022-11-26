import { randomUUID } from "crypto";
import mysql from "mysql";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import db from "../../DBConnection";

const client = new OAuth2Client(process.env.CLIENT_ID);

const queryUserInsert = (email: string, name: string, picture: string) => `
INSERT INTO user (id, email, name, picture) VALUES (UUID_TO_BIN(UUID()), ${mysql.escape(
  email
)}, ${mysql.escape(name)}, ${mysql.escape(picture)}); 
`;

const queryUserGet = (email: string) => `
SELECT BIN_TO_UUID(id) as uuid, email, name, picture FROM user WHERE email=${mysql.escape(
  email
)}
`;

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
      res.status(404).send("Can not find user email");
    }

    let resultsExistingUser = await db.query(queryUserGet(email));

    if (
      !Array.isArray(resultsExistingUser) ||
      resultsExistingUser.length === 0
    ) {
      await db.query(queryUserInsert(email, name, picture));
      resultsExistingUser = await db.query(queryUserGet(email));
    }

    req.session.userId = resultsExistingUser[0].uuid;
    res.status(200).json({
      email,
      name,
      picture,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
