import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reactBurgerApi } from "./api";
import ingredientsReducer from "../components/burger-ingredients/services/slice";
import constructorReducer from "../components/burger-constructor/services/slice";
import profileReducer from "../components/profile-components/services/slice";

const rootReducer = combineReducers({
  ingredientsConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  profile: profileReducer,
  [reactBurgerApi.reducerPath]: reactBurgerApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reactBurgerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
