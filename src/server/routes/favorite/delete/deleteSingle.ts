import { Request, Response } from "express";
import { validationResult } from "express-validator";
import db from "../../../DBConnection";
import {
  queryFavoritedItemDelete,
  queryRecipeIdGetByEdamamId,
} from "../../../queries";

import { errors as errorMessages } from "../../../models";

export const deleteSingle = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { recipeId } = req.body;
  try {
    const resultsExistingRecipe = await db.query(
      queryRecipeIdGetByEdamamId(recipeId)
    );

    if (
      !Array.isArray(resultsExistingRecipe) ||
      resultsExistingRecipe.length === 0
    ) {
      res.status(200).json(recipeId).end();
      return;
    }

    const [{ uuid }] = resultsExistingRecipe;

    const results = await db.query(
      queryFavoritedItemDelete(req.session.userId, uuid)
    );

    res.status(200).json(recipeId).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: errorMessages[500].default }).end();
  }
};
