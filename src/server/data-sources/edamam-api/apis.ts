import { API_URL } from "./constants";
import { fetchEdamam } from "./fetchEdamam";

export const search = async (queryParams: URLSearchParams) => {
  return fetchEdamam(API_URL, queryParams);
};

export const searchRecipeById = async (recipeId: string) => {
  return fetchEdamam(`${API_URL}${recipeId}`);
};
