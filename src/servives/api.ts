import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiURL } from "../common/constants";
import { IngredientItemType } from "../common/types";

interface ApiResponse {
  data: IngredientItemType[];
}

export type GetOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type GetOrderPayload = {
  ingredients: string[];
};

export const reactBurgerApi = createApi({
  reducerPath: "burgerApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  endpoints: (builder) => ({
    getIngredientItems: builder.query<IngredientItemType[], void>({
      query: () => "ingredients",
      transformResponse: (response: ApiResponse) => response.data,
    }),

    getOrder: builder.query<GetOrderResponse, GetOrderPayload>({
      query: (ingredientIds) => ({
        url: "/orders",
        method: "POST",
        body: ingredientIds,
      }),
    }),
  }),
});

export const { useGetIngredientItemsQuery, useGetOrderQuery } = reactBurgerApi;
