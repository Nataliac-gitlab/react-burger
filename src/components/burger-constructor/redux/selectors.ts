import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";
import { getBurgerIngredientsByIds } from "../../burger-ingredients/redux/selectors";

export const getBunId = (state: RootState) => state.ingredientsConstructor.bun;
export const getTopppingIds = (state: RootState) =>
  state.ingredientsConstructor.toppings;

export const getBun = createSelector(
  [getBurgerIngredientsByIds, getBunId],
  (ingredients, bunId) => {
    return bunId ? ingredients[bunId] : null;
  }
);

export const getToppings = createSelector(
  [getBurgerIngredientsByIds, getTopppingIds],
  (ingredients, toppingIds) => {
    return toppingIds
      .map((id) => ingredients[id])
      .filter((item) => item !== undefined);
  }
);

export const getTotalPrice = createSelector(
  [getBun, getToppings],
  (bun, toppings) => {
    const toppingsPrice = toppings.reduce((acc, item) => acc + item.price, 0);
    const bunPrice = bun ? bun.price * 2 : 0;
    return toppingsPrice + bunPrice;
  }
);

export const getOrderRequest = createSelector(
  [getBunId, getTopppingIds],
  (bunId, toppingIds) => {
    return {
      ingredients: [bunId, ...toppingIds, bunId],
    };
  }
);

export const getOrder = (state: RootState) =>
  state.ingredientsConstructor.order;

export const getScrollMaxHeight = (state: RootState): number =>
  state.ingredientsConstructor.toppings.length * 90;

export const getCountById = createSelector(
  [getBunId, getTopppingIds, (state, id) => id],
  (bunId, toppingIds, id) => {
    if (id === bunId) {
      return 2;
    }
    return toppingIds.filter((toppingId) => toppingId === id).length;
  }
);
