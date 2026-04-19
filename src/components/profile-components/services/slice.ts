import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../common/types";

export type Credentials = {
  accessToken: string | "";
  refreshToken: string | "";
};

type ProfileState = {
  user: UserType | null;
};

export const initialState: ProfileState = {
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserType>) => {
      state.user = { ...state.user, ...payload };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = profileSlice.actions;
export default profileSlice.reducer;
