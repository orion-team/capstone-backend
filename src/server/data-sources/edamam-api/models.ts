import { Recipe } from "src/server/models";

export interface EdamamResponseRecipes {
  hits: { recipe: Recipe }[];
}

export type EdamamResponseRecipe = {
  recipe: Recipe;
};
