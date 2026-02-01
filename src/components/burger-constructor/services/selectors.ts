import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../servives/store";
import { getBurgerIngredientsByIds } from "../../burger-ingredients/services/selectors";

export const getBunId = (state: RootState) => state.ingredientsConstructor.bun;
export const getToppingIdsAndUuids = (state: RootState) =>
  state.ingredientsConstructor.toppings;

export const getToppingIds = (state: RootState) => {
  return state.ingredientsConstructor.toppings.map((item) => {
    return item.id;
  });
};

export const getBun = createSelector(
  [getBurgerIngredientsByIds, getBunId],
  (ingredients, bunId) => {
    return bunId ? ingredients[bunId] : null;
  },
);

export const getToppings = createSelector(
  [getBurgerIngredientsByIds, getToppingIds],
  (ingredients, toppingIds) => {
    return toppingIds
      .map((id) => ingredients[id])
      .filter((item) => item !== undefined);
  },
);

export const getTotalPrice = createSelector(
  [getBun, getToppings],
  (bun, toppings) => {
    const toppingsPrice = toppings.reduce((acc, item) => acc + item.price, 0);
    const bunPrice = bun ? bun.price * 2 : 0;
    return toppingsPrice + bunPrice;
  },
);

export const getOrderRequest = createSelector(
  [getBunId, getToppingIds],
  (bunId, toppingIds) => {
    return {
      ingredients: [bunId, ...toppingIds, bunId],
    };
  },
);

export const getOrder = (state: RootState) =>
  state.ingredientsConstructor.order;

export const getScrollMaxHeight = (state: RootState): number =>
  state.ingredientsConstructor.toppings.length * 90;

export const getCountById = createSelector(
  [getBunId, getToppingIds, (state, id) => id],
  (bunId, toppingIds, id) => {
    if (id === bunId) {
      return 2;
    }
    return toppingIds.filter((toppingId) => toppingId === id).length;
  },
);
