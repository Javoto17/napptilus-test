import { configureStore } from "@reduxjs/toolkit";
import { rememberReducer, rememberEnhancer, Driver } from "redux-remember";
import { createStore, get, set } from "idb-keyval";

import loompaApi from "../services/loompas";
import loompaReducer from "../features/loompasSlice";

// Create a custom idb-keyval store (just needed to customize the name, else it's awkwardly named "keyval-store/keyval")
const idbKeyValStore = createStore("my-database", "my-store");

// Create redux-remember driver, wrapping idb-keyval
const idbKeyValDriver: Driver = {
  getItem: (key) => get(key, idbKeyValStore),
  setItem: (key, value) => set(key, value, idbKeyValStore),
};

const reducers = {
  [loompaApi.reducerPath]: loompaApi.reducer,
  loompaReducer: loompaReducer,
};

const rememberedKeys = ["loompaReducer"];

const reducer = rememberReducer(reducers);

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loompaApi.middleware),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      rememberEnhancer(idbKeyValDriver, rememberedKeys)
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export { store };
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
