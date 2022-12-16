import { Request, Response } from "express";
import { validationResult } from "express-validator";
import db from "../../../DBConnection";
import { EdamamResponseRecipe, searchRecipeById } from "../../../data-sources";

import {
  FavoritedItem,
  errors as errorMessages,
  parseRecipeIdFromUri,
  Recipe,
} from "../../../models";

import {
  queryFavoritedItemInsert,
  queryRecipeGetByEdamamId,
  queryRecipeInsert,
} from "../../../queries";

export const postSingle = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() }).end();
    return;
  }

  const { recipeId } = req.body;

  try {
    const result = await searchRecipeById(recipeId);

    if (result.status === 429) {
      res.status(429).end();
      return;
    }

    const { recipe }: EdamamResponseRecipe = await result.json();
    const edamamId = parseRecipeIdFromUri(recipe.uri);

    let resultsExistingRecipe = await db.query<Recipe & { uuid: string }>(
      queryRecipeGetByEdamamId(edamamId)
    );

    if (
      !Array.isArray(resultsExistingRecipe) ||
      resultsExistingRecipe.length === 0
    ) {
      await db.query(queryRecipeInsert(recipe));
      resultsExistingRecipe = await db.query(
        queryRecipeGetByEdamamId(edamamId)
      );
    }

    const [recipeInserted] = resultsExistingRecipe;

    const favoritedItem: FavoritedItem = {
      recipe,
      favoritedAt: new Date(),
    };

    await db.query(
      queryFavoritedItemInsert(recipeInserted.uuid, req.session.userId)
    );

    res.status(200).json(favoritedItem).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: errorMessages[500].default }).end();
  }
};
