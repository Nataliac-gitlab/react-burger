import { reactBurgerApi } from "../../../services/api";
import { setBurgerIngredients } from "./slice";
import { IngredientItemType } from "../../../common/types";
import { GetIngredientItemsResponse } from "../../../services/types";

export const ingredientsApi = reactBurgerApi.injectEndpoints({
  endpoints: (builder) => ({
    getIngredientItems: builder.query<IngredientItemType[], void>({
      query: () => "ingredients",
      transformResponse: (response: GetIngredientItemsResponse) =>
        response.data,

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBurgerIngredients(data));
        } catch (err) {
          console.error(`Ошибка получения данных ${err}`);
        }
      },
    }),
  }),
});

export const { useGetIngredientItemsQuery } = ingredientsApi;
