export type IngredientItemType = {
  _id: string;
  name: string;
  type: string; //enum
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export enum IngredientTypes {
  bun = "bun",
  sauce = "sauce",
  main = "main",
}

export enum IngredientTitles {
  bun = "Булки",
  sauce = "Соусы",
  main = "Начинка",
}

export const AllIngredients: Record<IngredientTypes, IngredientTitles> = {
  bun: IngredientTitles.bun,
  sauce: IngredientTitles.sauce,
  main: IngredientTitles.main,
};
