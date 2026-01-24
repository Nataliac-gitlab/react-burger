import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type BurgerConstructorState = {
  bun: string;
  toppings: string[];
  order: number;
};

const initialState: BurgerConstructorState = {
  bun: "643d69a5c3f7b9001cfa093c",
  toppings: [
    "643d69a5c3f7b9001cfa0941",
    "643d69a5c3f7b9001cfa0942",
    "643d69a5c3f7b9001cfa0942",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0940",
  ],
  order: 0,
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBun: (state, { payload }: PayloadAction<string>) => {
      state.bun = payload;
    },
    addTopping: (state, { payload }: PayloadAction<string>) => {
      state.toppings = [...state.toppings, payload];
    },
    setOrder: (state, { payload }: PayloadAction<number>) => {
      state.order = payload;
    },
    removeOrder: (state) => {
      state.order = 0;
    },
  },
});

export const { addBun, addTopping, setOrder, removeOrder } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
