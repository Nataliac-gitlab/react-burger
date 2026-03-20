import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { apiURL, wsBaseURL } from "../common/constants";
import { IngredientItemType } from "../common/types";
import {
  GetOrderResponse,
  GetOrderPayload,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  GetTokenPayload,
  GetTokenResponse,
  LogoutPayload,
  LogoutResponse,
  UserResponse,
  UpdateUserPayload,
  WSResponse,
  GetOrderByNumberResponse,
} from "./types";

import {
  setUser,
  clearUser,
} from "../components/profile-components/services/slice";
import { setBurgerIngredients } from "../components/burger-ingredients/services/slice";
import { getIngredientsIds } from "../components/burger-ingredients/services/selectors";
import { TFeed } from "../common/types";
import { RootState } from "./store";

//to do move to types
interface IApiResponse {
  data: IngredientItemType[];
}

const baseQuery = fetchBaseQuery({
  baseUrl: apiURL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("authorization", accessToken);
    }
    return headers;
  },
});

const baseQueryWrapper: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "auth/token",
          method: "POST",
          body: { token: refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as GetTokenResponse;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }
  return result;
};

export const reactBurgerApi = createApi({
  reducerPath: "burgerApi",
  baseQuery: baseQueryWrapper,
  endpoints: (builder) => ({
    getIngredientItems: builder.query<IngredientItemType[], void>({
      query: () => "ingredients",
      transformResponse: (response: IApiResponse) => response.data,

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBurgerIngredients(data));
        } catch (err) {
          console.error(`Ошибка получения данных ${err}`);
        }
      },
    }),

    getOrder: builder.query<GetOrderResponse, GetOrderPayload>({
      query: (ingredientIds) => ({
        url: "/orders",
        method: "POST",
        body: ingredientIds,
      }),
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordPayload
    >({
      query: (props) => ({
        url: "password-reset",
        method: "POST",
        body: props,
      }),
    }),

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordPayload
    >({
      query: (props) => ({
        url: "password-reset/reset",
        method: "POST",
        body: props,
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.accessToken && data?.refreshToken && data.user) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            dispatch(setUser({ ...data.user, password: credentials.password }));
          }
        } catch (err) {
          console.error(`Ошибка регистрации пользователя: ${err}`);
        }
      },
    }),

    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.accessToken && data?.refreshToken && data.user) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            dispatch(setUser({ ...data.user, password: credentials.password }));
          }
        } catch (err) {
          console.error(`Ошибка логина: ${err}`);
        }
      },
    }),

    getToken: builder.query<GetTokenResponse, GetTokenPayload>({
      query: (props) => ({
        url: "auth/token",
        method: "POST",
        body: props,
      }),
    }),

    logout: builder.mutation<LogoutResponse, LogoutPayload>({
      query: (props) => ({
        url: "auth/logout",
        method: "POST",
        body: props,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(clearUser());
        } catch (err) {
          console.error(`Ошибка выхода: ${err}`);
        }
      },
    }),

    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: "auth/user",
        method: "GET",
      }),
    }),

    updateUser: builder.mutation<UserResponse, UpdateUserPayload>({
      query: (credentials) => ({
        url: "auth/user",
        method: "PATCH",
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            dispatch(setUser({ ...data.user, password: credentials.password }));
          }
        } catch (err) {
          console.error(`Ошибка изменения данных: ${err}`);
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
              reactBurgerApi.endpoints.getIngredientItems.initiate(),
            );
          }

          const { data } = await queryFulfilled;
          const state2 = getState() as RootState;
          const ingredientIds = getIngredientsIds(state2);

          const validOrders = data.orders.filter((order) => {
            return order.ingredients.every((id) => ingredientIds.includes(id));
          });
          dispatch(
            reactBurgerApi.util.updateQueryData(
              "getOrderByNumber",
              args,
              (draft) => {
                draft.orders = validOrders;
              },
            ),
          );
        } catch {
          console.log("Fetchin failed or invalid data");
        }
      },
    }),

    //WS
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
              reactBurgerApi.endpoints.getIngredientItems.initiate(),
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
  }),
});

export const {
  useGetIngredientItemsQuery,
  useGetOrderQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetTokenQuery,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetOrdersFeedQuery,
  useGetOrderByNumberQuery,
} = reactBurgerApi;
