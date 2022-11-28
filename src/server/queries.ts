import mysql from "mysql";
import { parseRecipeIdFromUri, Recipe } from "./models";

export const queryUserGetByUUID = (uuid: string) => `
SELECT BIN_TO_UUID(id) as uuid, email, name, picture FROM user WHERE id=UUID_TO_BIN(${mysql.escape(
  uuid
)})
`;

export const queryUserGetByEmail = (email: string) => `
SELECT BIN_TO_UUID(id) as uuid, email, name, picture FROM user WHERE email=${mysql.escape(
  email
)}
`;

export const queryUserInsert = (
  email: string,
  name: string,
  picture: string
) => `
INSERT INTO user (id, email, name, picture) VALUES (UUID_TO_BIN(UUID()), ${mysql.escape(
  email
)}, ${mysql.escape(name)}, ${mysql.escape(picture)}); 
`;

export const queryRecipeInsert = (recipe: Recipe) => {
  const {
    uri,
    label,
    image,
    source,
    url,
    images,
    ingredientLines,
    ingredients,
    calories,
    cuisineType,
  } = Object.keys(recipe).reduce((acc, key) => {
    return {
      ...acc,
      [key]: mysql.escape(recipe[key]),
    };
  }, recipe) as Recipe;

  const edamam_id = parseRecipeIdFromUri(uri);

  // TODO
  const imagesJSON = JSON.stringify(images);
  const ingredientLinesJSON = JSON.stringify(ingredientLines);
  const ingredientsJSON = JSON.stringify(ingredients);

  // TODO escape?
  return `
    INSERT INTO recipe (id, edamam_id, uri, label, image, source, url, calories, cuisineType) 
    VALUES (UUID_TO_BIN(UUID()), ${mysql.escape(
      edamam_id
    )}, ${uri}, ${label}, ${image}, ${source}, ${url}, ${calories}, ${cuisineType});
`;
};

export const queryRecipeGetByEdamamId = (edamamId: string) => {
  return `SELECT BIN_TO_UUID(id) as uuid, edamam_id, uri, label, image, source, url, calories, cuisineType FROM recipe WHERE edamam_id=${mysql.escape(
    edamamId
  )}`;
};

export const queryRecipeIdGetByEdamamId = (edamamId: string) => {
  return `SELECT BIN_TO_UUID(id) as uuid FROM recipe WHERE edamam_id=${mysql.escape(
    edamamId
  )}`;
};

export const queryFavoritedItemInsert = (recipeId: string, userId: string) => {
  return `
    INSERT INTO favorited_item (recipe_id, user_id, favorited_at) VALUES (UUID_TO_BIN('${recipeId}'), UUID_TO_BIN('${userId}'), NOW()); 
`;
};

export const queryFavoritesByUserId = (userId: string) => {
  return `SELECT * FROM favorited_item LEFT JOIN recipe ON favorited_item.recipe_id = recipe.id WHERE user_id=UUID_TO_BIN('${userId}')`;
};

export const queryFavoritedItemDelete = (userId: string, recipeId: string) => {
  return `DELETE FROM favorited_item WHERE user_id=UUID_TO_BIN('${userId}') AND recipe_id=UUID_TO_BIN('${recipeId}');`;
};
