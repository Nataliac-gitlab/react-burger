export type IngredientItemType = {
  _id: string;
  name: string;
  type: string;
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

export type IngredientItemsResponce = IngredientItemType[];

export enum IngredientTypes {
  bun = "bun",
  sauce = "sauce",
  main = "main",
}

export const IngredientTitles: Record<IngredientTypes, string> = {
  [IngredientTypes.bun]: "Булки",
  [IngredientTypes.sauce]: "Соусы",
  [IngredientTypes.main]: "Начинка",
};

export interface DraggedIngredientItem {
  id: string;
  type?: string;
}
