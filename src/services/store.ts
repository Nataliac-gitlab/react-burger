import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reactBurgerApi } from "./api";
import ingredientsReducer from "../components/burger-ingredients/services/slice";
import constructorReducer from "../components/burger-constructor/services/slice";
import profileReducer from "../components/profile-components/services/slice";
import feedReducer from "../components/feed-components/services/slice";

const profilePersistConfig = {
  key: "profile",
  storage,
  whitelist: ["password"],
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile"],
};

const rootReducer = combineReducers({
  ingredientsConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  profile: persistReducer(profilePersistConfig, profileReducer),
  [reactBurgerApi.reducerPath]: reactBurgerApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reactBurgerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
