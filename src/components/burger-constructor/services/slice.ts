import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type BurgerConstructorState = {
  bun: string;
  toppings: { id: string; uuid: string }[];
  order: number;
};

const initialState: BurgerConstructorState = {
  bun: "",
  toppings: [],
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
      const uuid = crypto.randomUUID();
      state.toppings = [...state.toppings, { id: payload, uuid }];
    },
    addToppingToIndex: (
      state,
      { payload }: PayloadAction<{ id: string; index: number }>,
    ) => {
      const { id, index } = payload;
      const uuid = crypto.randomUUID();
      const toppings = [
        ...state.toppings.slice(0, index),
        { id, uuid },
        ...state.toppings.slice(index),
      ];
      state.toppings = [...toppings];
    },
    removeToppingByIndex: (state, { payload }: PayloadAction<number>) => {
      state.toppings.splice(payload, 1);
    },
    moveTopping: (
      state,
      { payload }: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) => {
      const { fromIndex, toIndex } = payload;
      const toppings = [...state.toppings];
      const item = toppings.splice(fromIndex, 1)[0];
      toppings.splice(toIndex, 0, item);
      state.toppings = [...toppings];
    },
    setOrder: (state, { payload }: PayloadAction<number>) => {
      state.order = payload;
    },
    removeOrder: (state) => {
      state.order = 0;
    },
  },
});

export const {
  addBun,
  removeToppingByIndex,
  addTopping,
  addToppingToIndex,
  moveTopping,
  setOrder,
  removeOrder,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
