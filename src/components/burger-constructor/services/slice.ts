import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Topping {
  id: string;
  uuid: string;
}

export type BurgerConstructorState = {
  bun: string;
  toppings: Topping[];
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
    addTopping: {
      reducer: (state, { payload }: PayloadAction<Topping>) => {
        state.toppings = [...state.toppings, payload];
      },
      prepare: (id: string) => {
        const uuid = crypto.randomUUID();
        return { payload: { id, uuid } };
      },
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
    clearBurgerConstructor: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addBun,
  removeToppingByIndex,
  addTopping,
  moveTopping,
  setOrder,
  removeOrder,
  clearBurgerConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
