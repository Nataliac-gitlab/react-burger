import { configureStore } from "@reduxjs/toolkit";
import { reactBurgerApi } from "./api";
import ingredientsReducer from "../components/burger-ingredients/services/slice";
import constructorReducer from "../components/burger-constructor/services/slice";
import ingredientDetailsReducer from "../components/burger-ingredients/ingredient-details/services/slice";

export const store = configureStore({
  reducer: {
    ingredientsConstructor: constructorReducer,
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    [reactBurgerApi.reducerPath]: reactBurgerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reactBurgerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
