import { RootState } from "../../../services/store";

export const getEmail = (state: RootState) => state.profile.user?.email;

export const getPassword = (state: RootState) => state.profile.user?.password;

export const getName = (state: RootState) => state.profile.user?.name;

export const getUser = (state: RootState) => state.profile.user;
