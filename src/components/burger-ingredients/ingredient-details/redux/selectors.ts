import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../redux/store";
import { getBurgerIngredientsByIds } from "../../../burger-ingredients/redux/selectors";

export const getIngredientId = (state: RootState) =>
  state.ingredientDetails.ingredientId;

export const getIngredientDetails = createSelector(
  [getIngredientId, getBurgerIngredientsByIds],
  (id, ingredients) => {
    if (!id || !ingredients[id]) {
      return null;
    }
    const { image, name, calories, proteins, fat, carbohydrates } =
      ingredients[id];
    return { image, name, calories, proteins, fat, carbohydrates };
  }
);
