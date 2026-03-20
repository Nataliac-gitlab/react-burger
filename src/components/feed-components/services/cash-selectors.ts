import { reactBurgerApi } from "../../../services/api";
import { getBurgerIngredientsByIds } from "../../burger-ingredients/services/selectors";
import { TFeed } from "../../../common/types";
import { createAppSelector } from "../../../services/hooks";

const selectFeedResult = (type: TFeed) =>
  reactBurgerApi.endpoints.getOrdersFeed.select(type);

export const selectFeedData = (type: TFeed) =>
  createAppSelector(selectFeedResult(type), (result) => result.data);

export const getOrders = (type: TFeed) =>
  createAppSelector(selectFeedData(type), (data) => data?.orders ?? []);

export const getTotal = (type: TFeed) =>
  createAppSelector(selectFeedData(type), (data) => data?.total ?? 0);

export const getTotalToday = (type: TFeed) =>
  createAppSelector(selectFeedData(type), (data) => data?.totalToday ?? 0);

export const getPrices = (type: TFeed) =>
  createAppSelector(
    getBurgerIngredientsByIds,
    getOrders(type),
    (ingredients, orders) => {
      return orders.map((order) => {
        return order.ingredients.reduce(
          (acc, item) => acc + (ingredients[item]?.price ?? 0),
          0,
        );
      });
    },
  );

export const getOrderByNumber = (type: TFeed, number: string) =>
  createAppSelector(
    getOrders(type),
    (orders) =>
      orders.find((order) => order.number.toString() === number) ?? null,
  );

export const getDone = (type: TFeed) =>
  createAppSelector(getOrders(type), (orders) => {
    return orders
      .filter((item) => item.status === "done")
      .map((item) => item.number);
  });

export const getInProgress = (type: TFeed) =>
  createAppSelector(getOrders(type), (orders) => {
    return orders
      .filter((item) => item.status === "inProgress")
      .map((item) => item.number);
  });
