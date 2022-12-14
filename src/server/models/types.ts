const imageSize = {
  thumbnail: "THUMBNAIL",
  small: "SMALL",
  regular: "REGULAR",
  large: "LARGE",
} as const;

export type ImageKey = typeof imageSize[keyof typeof imageSize];
export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  // Source site identifier
  source: string;
  // Original recipe URL
  url: string;
  calories: number;
  cuisineType: string;
  images?: Record<ImageKey, Image>;
  ingredientLines?: string[];
  ingredients?: Ingedient[];
}

export interface Ingedient {
  text?: string;
  quantity?: number;
  measure?: string;
  food?: string;
  weight?: number;
  // shopping isle category
  foodCategory?: string;
  foodId?: string;
  image?: string;
}

export interface User {
  email: string;
  name: string;
  picture: string;
}

export interface FavoritedItem {
  recipe: Recipe;
  favoritedAt: Date;
}
