import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IngredientItemType } from "../../../common/types";
//type IngredientItemType: string;

export type IngredientsById = Record<string, IngredientItemType>;

export type BurgerIngredientsState = {
  ingredientsById: IngredientsById;
};

const initialState: BurgerIngredientsState = {
  ingredientsById: {},
};

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {
    setBurgerIngredients: (
      state,
      { payload }: PayloadAction<IngredientItemType[]>
    ) => {
      state.ingredientsById = Object.fromEntries(
        payload.map((item) => [item._id, item])
      );
    },
  },
});

export const { setBurgerIngredients } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
