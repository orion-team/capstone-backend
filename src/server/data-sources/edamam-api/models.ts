import { Recipe } from "src/server/models";

export type EdamamResponseRecipe = {
  recipe: Recipe;
};

export interface EdamamResponseRecipes {
  hits: EdamamResponseRecipe[];
}
