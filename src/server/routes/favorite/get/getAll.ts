import { Request, Response } from "express";
import { FavoritedItem } from "../models";

// TODO - implement

const favorites: FavoritedItem[] = [
  {
    id: "1",
    title: "Peach Cobbler By Tracy Burgess",
    url: "https://www.justapinch.com/recipes/dessert/other-dessert/peach-cobbler-by-tracy-burgess.html",
    imageURL: "https://i2.supercook.com/5/c/b/e/5cbe357e8b373719fcd515e7-t.jpg",
  },
  {
    id: "2",
    title: "Easy Eggless Pie Crust Dough Recipe",
    url: "https://eugeniekitchen.com/eggless-pie-crust-dough/",
    imageURL:
      "https://i2.supercook.com/9/1/5/6/9156c635428749c56f844126649aa19a-0.jpg",
  },
];

export const getAll = async (req: Request, res: Response) => {
  res.send(favorites);
};
