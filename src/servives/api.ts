import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { apiURL } from "../common/constants";
import { IngredientItemType } from "../common/types";
//import { RootState } from "./store";
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
//import { useAppDispatch } from "./hooks";
//import {clearUser} from "../components/profile-components/services/slice";

interface ApiResponse {
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
  console.log("api1 ", result);
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
        console.log("api4 ");
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
      transformResponse: (response: ApiResponse) => response.data,
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
      query: (props) => ({
        url: "auth/register",
        method: "POST",
        body: props,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        } catch (err) {
          // Todo
        }
      },
    }),

    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (props) => ({
        url: "auth/login",
        method: "POST",
        body: props,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        } catch (err) {
          // Todo
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
    }),

    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: "auth/user",
        method: "GET",
      }),
    }),

    updateUser: builder.mutation<UserResponse, UpdateUserPayload>({
      query: (props) => ({
        url: "auth/user",
        method: "PATCH",
        body: props,
      }),
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
