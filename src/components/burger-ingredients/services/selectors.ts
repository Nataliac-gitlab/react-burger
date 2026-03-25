import { RootState } from "../../../services/store";
import { createAppSelector } from "../../../services/hooks";
import { IngredientTypes } from "../../../common/types";

export const getBurgerIngredientsByIds = (state: RootState) =>
  state.ingredients.ingredientsById;

export const getBurgerIngredients = (state: RootState) => {
  const ingredients = state.ingredients.ingredientsById;
  return Object.values(ingredients);
};

export const getIngredientsIds = (state: RootState) => {
  return Object.keys(state.ingredients.ingredientsById);
};

export const getIngredientItemById = (id: string) =>
  createAppSelector(getBurgerIngredientsByIds, (ingredients) => {
    if (!id || !ingredients[id]) {
      return null;
    }
    const { name, image, price, type, calories, proteins, fat, carbohydrates } =
      ingredients[id];
    return { name, image, price, type, calories, proteins, fat, carbohydrates };
  });

export const getIngredientIdsByType = (type: IngredientTypes) =>
  createAppSelector(getBurgerIngredientsByIds, (ingredients) => {
    return Object.keys(ingredients).filter(
      (key) => ingredients[key].type === type,
    );
  });

export const getOrderPriceByIngredients = (orderIngredients: string[]) =>
  createAppSelector(getBurgerIngredientsByIds, (ingredients) => {
    return orderIngredients.reduce(
      (acc, item) => acc + (ingredients[item]?.price ?? 0),
      0,
    );
  });
