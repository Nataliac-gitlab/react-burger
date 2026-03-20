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
  /*
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0944",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa094a",
        "643d69a5c3f7b9001cfa0949",
        "643d69a5c3f7b9001cfa0948",
        "643d69a5c3f7b9001cfa0947",
      ],
      _id: "1001",
      status: "cancelled",
      name: "QWERTY  hhhhhhh jjjjjjjjjj kkkkkkkбургер",
      number: 1012345,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0944",

        "643d69a5c3f7b9001cfa0949",
        "643d69a5c3f7b9001cfa0948",
        "643d69a5c3f7b9001cfa0947",
      ],
      _id: "1001",
      status: "inProgress",
      name: "Try-catch бургер",
      number: 2,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
    {
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0944",

        "643d69a5c3f7b9001cfa0949",
        "643d69a5c3f7b9001cfa0948",
        "643d69a5c3f7b9001cfa0947",
      ],
      _id: "1001",
      status: "done",
      name: "Try-catch бургер",
      number: 228758,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
    },
  ],
  */
  total: 0,
  totalToday: 0,
};

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
