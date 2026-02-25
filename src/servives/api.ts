import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { apiURL } from "../common/constants";
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
} from "./types";

import {
  setUser,
  clearUser,
} from "../components/profile-components/services/slice";
import { setBurgerIngredients } from "../components/burger-ingredients/services/slice";

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
} = reactBurgerApi;
