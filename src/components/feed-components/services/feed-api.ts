import { reactBurgerApi } from "../../../services/api";
import { ingredientsApi } from "../../burger-ingredients/services/ingredients-api";
import { RootState } from "../../../services/store";
import { getIngredientsIds } from "../../../components/burger-ingredients/services/selectors";
import { wsBaseURL } from "../../../common/constants";
import { TFeed } from "../../../common/types";
import { WSResponse, GetOrderByNumberResponse } from "../../../services/types";

export const feedApi = reactBurgerApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersFeed: builder.query<WSResponse, TFeed>({
      queryFn: (type) => ({
        data: { success: false, orders: [], total: "0", totalToday: "0" },
      }),

      async onCacheEntryAdded(
        type,
        {
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
          dispatch,
          getState,
        },
      ) {
        let ws: WebSocket | null = null;
        let isConnected = true;

        const ensureIngredientsLoaded = async () => {
          const state = getState() as RootState;
          const currentIngredients = getIngredientsIds(state);

          if (!currentIngredients || currentIngredients.length === 0) {
            console.log("Ingredients missing, fetching...");
            await dispatch(
              ingredientsApi.endpoints.getIngredientItems.initiate(),
            );
          }
        };

        const refreshAccessToken = async () => {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) return null;

          try {
            const refreshResult = await dispatch(
              reactBurgerApi.endpoints.getToken.initiate({
                token: refreshToken,
              }),
            ).unwrap();
            console.log("refreshResult", refreshResult);

            if (refreshResult && refreshResult.success) {
              localStorage.setItem("accessToken", refreshResult.accessToken);
              localStorage.setItem("refreshToken", refreshResult.refreshToken);
              return refreshResult.accessToken;
            }
          } catch (err) {
            console.error("Refresh token failed", err);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
          return null;
        };

        const connect = () => {
          const token = localStorage
            .getItem("accessToken")
            ?.replace("Bearer ", "");
          const url =
            type === "all" ? `${wsBaseURL}/all` : `${wsBaseURL}?token=${token}`;

          ws = new WebSocket(url);

          ws.onmessage = async (event) => {
            const data: WSResponse = JSON.parse(event.data);
            const ingredientIds = getIngredientsIds(getState() as RootState);

            if (data.message === "Invalid or missing token") {
              console.error("WS Token Error");
              if (ws) {
                ws.onclose = null;
                ws.close();
              }

              const newToken = await refreshAccessToken();
              if (newToken && isConnected) {
                connect();
              }
            }

            if (data.success) {
              updateCachedData((draft) => {
                draft.orders = data.orders.filter((order) => {
                  return order.ingredients.every((id) =>
                    ingredientIds.includes(id),
                  );
                });
                draft.total = data.total;
                draft.totalToday = data.totalToday;
                draft.success = true;
              });
            }
          };

          ws.onclose = () => {
            console.warn("On close WS");
            if (isConnected) {
              console.warn("WS reconnect");
              setTimeout(connect, 3000);
            }
          };

          ws.onerror = (err) => console.error("WS Error:", err);
        };

        try {
          await cacheDataLoaded;
          await ensureIngredientsLoaded();
          connect();
        } catch (err) {
          console.error("Cache initialization failed", err);
        }

        await cacheEntryRemoved;

        isConnected = false;
        if (ws) {
          (ws as WebSocket).close();
        }
      },
    }),

    getOrderByNumber: builder.query<GetOrderByNumberResponse, string>({
      query: (props) => ({
        url: `orders/${props}`,
        method: "GET",
      }),

      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        try {
          const state1 = getState() as RootState;
          const currentIngredients = getIngredientsIds(state1);

          if (!currentIngredients || currentIngredients.length === 0) {
            console.log("Ingredients missing, fetching...");
            await dispatch(
              ingredientsApi.endpoints.getIngredientItems.initiate(),
            );
          }

          const { data } = await queryFulfilled;
          const state2 = getState() as RootState;
          const ingredientIds = getIngredientsIds(state2);

          const validOrders = data.orders.filter((order) => {
            return order.ingredients.every((id) => ingredientIds.includes(id));
          });
          dispatch(
            feedApi.util.updateQueryData("getOrderByNumber", args, (draft) => {
              draft.orders = validOrders;
            }),
          );
        } catch {
          console.log("Fetchin failed or invalid data");
        }
      },
    }),
  }),
});

export const { useGetOrdersFeedQuery, useGetOrderByNumberQuery } = feedApi;
