import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { apiURL } from "../common/constants";
import { GetTokenPayload, GetTokenResponse } from "./types";
import {} from "../components/profile-components/services/slice";

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
    getToken: builder.query<GetTokenResponse, GetTokenPayload>({
      query: (props) => ({
        url: "auth/token",
        method: "POST",
        body: props,
      }),
    }),
  }),
});

export const { useGetTokenQuery } = reactBurgerApi;
