import { reactBurgerApi } from "../../../services/api";
import {
  RegisterResponse,
  RegisterPayload,
  ForgotPasswordResponse,
  ForgotPasswordPayload,
  ResetPasswordResponse,
  ResetPasswordPayload,
  UserResponse,
  UpdateUserPayload,
  LoginResponse,
  LoginPayload,
  LogoutResponse,
  LogoutPayload,
} from "../../../services/types";
import { setUser, clearUser } from "./slice";

export const profileApi = reactBurgerApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useLoginMutation,

  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = profileApi;
