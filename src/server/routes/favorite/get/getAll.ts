import { Request, Response } from "express";
import { FavoritedItem } from "../../../models";
import db from "../../../DBConnection";
import { queryFavoritesByUserId } from "../../../queries";

export const getAll = async (req: Request, res: Response) => {
  try {
    const results = await db.query(queryFavoritesByUserId(req.session.userId));

    const favoritedItems = results.map(
      ({
        favorited_at,
        uri,
        label,
        image,
        source,
        url,
        calories,
        cuisineType,
      }) => {
        const favoritedItem: FavoritedItem = {
          favoritedAt: favorited_at,
          recipe: {
            uri,
            label,
            image,
            source,
            url,
            calories,
            cuisineType,
          },
        };

        return favoritedItem;
      }
    );

    res.status(200).json(favoritedItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
