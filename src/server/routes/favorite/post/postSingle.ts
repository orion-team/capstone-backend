import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { FavoritedItem } from "../models";

export const postSingle = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const favoritedItem: FavoritedItem = {
    id: "2",
    title: "Easy Eggless Pie Crust Dough Recipe",
    url: "https://eugeniekitchen.com/eggless-pie-crust-dough/",
    imageURL:
      "https://i2.supercook.com/9/1/5/6/9156c635428749c56f844126649aa19a-0.jpg",
  };

  res.status(200).send(favoritedItem);
};
