import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IngredientDetailsState = {
  ingredientId: string;
};

const initialState: IngredientDetailsState = {
  ingredientId: "",
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setCurrentIngredientId: (state, { payload }: PayloadAction<string>) => {
      state.ingredientId = payload;
    },
    removeCurrentIngredientId: (state) => {
      state.ingredientId = "";
    },
  },
});

export const { setCurrentIngredientId, removeCurrentIngredientId } =
  ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
