import { RootState } from "../../../services/store";
import { getBurgerIngredientsByIds } from "../../burger-ingredients/services/selectors";
import { createAppSelector } from "../../../services/hooks";

export const getBunId = (state: RootState) => state.ingredientsConstructor.bun;
export const getToppingIdsAndUuids = (state: RootState) =>
  state.ingredientsConstructor.toppings;

export const getToppingIds = (state: RootState) => {
  return state.ingredientsConstructor.toppings.map((item) => {
    return item.id;
  });
};

export const getBun = createAppSelector(
  [getBurgerIngredientsByIds, getBunId],
  (ingredients, bunId) => {
    return bunId ? ingredients[bunId] : null;
  },
);

export const getToppings = createAppSelector(
  [getBurgerIngredientsByIds, getToppingIds],
  (ingredients, toppingIds) => {
    return toppingIds
      .map((id) => ingredients[id])
      .filter((item) => item !== undefined);
  },
);

export const getTotalPrice = createAppSelector(
  [getBun, getToppings],
  (bun, toppings) => {
    const toppingsPrice = toppings.reduce((acc, item) => acc + item.price, 0);
    const bunPrice = bun ? bun.price * 2 : 0;
    return toppingsPrice + bunPrice;
  },
);

export const getOrderRequest = createAppSelector(
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

export const getCountById = (id: string) =>
  createAppSelector([getBunId, getToppingIds], (bunId, toppingIds) => {
    if (id === bunId) {
      return 2;
    }
    return toppingIds.filter((toppingId) => toppingId === id).length;
  });
