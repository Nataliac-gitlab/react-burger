import { reactBurgerApi } from "../../../services/api";
import { GetOrderResponse, GetOrderPayload } from "../../../services/types";

const constructorApi = reactBurgerApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query<GetOrderResponse, GetOrderPayload>({
      query: (ingredientIds) => ({
        url: "/orders",
        method: "POST",
        body: ingredientIds,
      }),
    }),
  }),
});

export const { useGetOrderQuery } = constructorApi;
