export interface Recipe {
  uri: string;
  label: string;
  image: string;
  // Source site identifier
  source: string;

  // Original recipe URL
  url: string;
}

export interface Food {
  foodId: string;
  label: string;
}

export interface Measure {
  // Ontology indetifier
  uri: string;

  // Common Name
  label: string;
}

export interface Ingedient {
  foodId: string;
  quantity: number;
  measure: Measure;
  weight: number;
  food: Food;
  // shopping isle category
  foodCategory: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export interface FavoritedItem {
  recipe: Recipe;
  favoritedAt: Date;
}
