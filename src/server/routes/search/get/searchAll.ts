import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { errors as errorMessages } from "../../../models";
import { EdamamResponseRecipes, search } from "../../../data-sources";

export const searchAll = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await search(
      new URLSearchParams(req.query as Record<string, string>)
    );

    if (result.status !== 200) {
      throw new Error("Non success status");
    }

    const data: EdamamResponseRecipes = await result.json();
    res.status(200).json(data);
  } catch (error) {
    // TODO fix
    res.status(500);
    res.render("error", { error: errorMessages[500].default });
  }
};
