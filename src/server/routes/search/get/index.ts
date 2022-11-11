import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { errors as errorMessages } from "../../../models";
import { EdamamResponse, search as searchEdamam } from "../../../data-sources";

export const search = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { q } = req.query;

  try {
    const result = await searchEdamam(JSON.stringify(q));

    if (result.status !== 200) {
      throw new Error("Non success status");
    }

    const data: EdamamResponse = await result.json();
    const recipes = data.hits.map((hit) => hit.recipe);
    res.status(200).json(recipes);
  } catch (error) {
    // TODO fix
    res.status(500);
    res.render("error", { error: errorMessages[500].default });
  }
};
