import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../../../common/types";
import { WSResponse } from "../../../services/types";

export type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
};
//redundant
const FeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, { payload }: PayloadAction<WSResponse>) => {
      state.orders = [...payload.orders];
      state.total = Number(payload.total) || 0;
      state.totalToday = Number(payload.totalToday || 0);
    },
  },
});

export const { setFeed } = FeedSlice.actions;

export default FeedSlice.reducer;
