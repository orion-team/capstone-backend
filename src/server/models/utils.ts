export const parseRecipeIdFromUri = (uri: string) => {
  const matches = /#recipe_(\w*)/gm.exec(uri);
  return matches?.[1] ?? "";
};
