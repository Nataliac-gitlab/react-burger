import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";

export const getBurgerIngredientsByIds = (state: RootState) =>
  state.ingredients.ingredientsById;

export const getBurgerIngredients = (state: RootState) => {
  const ingredients = state.ingredients.ingredientsById;
  return Object.values(ingredients);
};

export const getIngredientItemById = createSelector(
  [getBurgerIngredientsByIds, (state, id) => id],
  (ingredients, id) => {
    if (!id || !ingredients[id]) {
      return null;
    }
    const { name, image, price } = ingredients[id];
    return { name, image, price };
  }
);

export const getIngredientIdsByType = createSelector(
  [getBurgerIngredientsByIds, (state, type) => type],
  (ingredients, type) => {
    return Object.keys(ingredients).filter(
      (key) => ingredients[key].type === type
    );
  }
);
