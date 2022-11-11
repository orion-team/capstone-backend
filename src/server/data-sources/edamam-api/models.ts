import { Recipe } from "src/server/models";

export interface EdamamResponse {
  hits: { recipe: Recipe }[];
}
