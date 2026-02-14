import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../common/types";

export type Credentials = {
  accessToken: string | "";
  refreshToken: string | "";
};

type ProfileState = {
  user: UserType | null;
};

const initialState: ProfileState = {
  // accessToken: localStorage.getItem('accessToken') || "",
  // refreshToken: localStorage.getItem('refreshToken') || "",
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    /*
    setCredentials: (state, {payload}: PayloadAction<Credentials>) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      localStorage.setItem('access_token', payload.accessToken);
      localStorage.setItem('refresh_token', payload.refreshToken);
    },
    */

    setUser: (state, { payload }: PayloadAction<UserType>) => {
      state.user = { ...state.user, ...payload };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { /* setCredentials,*/ setUser, clearUser } = profileSlice.actions;
export default profileSlice.reducer;
