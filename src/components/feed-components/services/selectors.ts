import { createAppSelector } from "../../../services/hooks";
import { RootState } from "../../../services/store";
import { getBurgerIngredientsByIds } from "../../burger-ingredients/services/selectors";

export const getOrders = (state: RootState) => state.feed.orders;
export const getTotal = (state: RootState) => state.feed.total;
export const getTotalToday = (state: RootState) => state.feed.totalToday;

export const getPrices = createAppSelector(
  [getBurgerIngredientsByIds, getOrders],
  (ingredients, orders) => {
    return orders.map((order) => {
      return order.ingredients.reduce(
        (acc, item) => acc + (ingredients[item]?.price ?? 0),
        0,
      );
    });
  },
);

export const getOrderByNumber = (
  state: RootState,
  number: string | undefined,
) => {
  return (
    state.feed.orders.find((item) => item.number.toString() === number) ?? null
  );
};

export const getOrderIngredientCountByNumber = createAppSelector(
  [getOrderByNumber],
  (order) => {
    if (!order || !order.ingredients) {
      return {};
    }
    return order.ingredients.reduce(
      (acc: Record<string, number>, current) => {
        acc[current] = acc[current] ? acc[current] + 1 : 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  },
);

export const getOrderPriceByNumber = createAppSelector(
  [getBurgerIngredientsByIds, getOrderByNumber],
  (ingredients, order) => {
    if (!order) {
      return 0;
    }
    return order.ingredients.reduce(
      (acc, item) => acc + (ingredients[item]?.price ?? 0),
      0,
    );
  },
);

export const getDone = createAppSelector([getOrders], (orders) => {
  return orders
    .filter((item) => item.status === "done")
    .map((item) => item.number);
});

export const getInProgress = createAppSelector([getOrders], (orders) => {
  return orders
    .filter((item) => item.status === "inProgress")
    .map((item) => item.number);
});
