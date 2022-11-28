import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { errors as errorMessages } from "../../../models";
import { EdamamResponseRecipe, searchRecipeById } from "../../../data-sources";

export const searchById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { recipeId } = req.params;

  try {
    const result = await searchRecipeById(recipeId);

    if (result.status !== 200) {
      throw new Error("Non success status");
    }

    const data: EdamamResponseRecipe = await result.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: errorMessages[500].default });
  }
};
