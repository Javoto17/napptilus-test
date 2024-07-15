import { configureStore } from "@reduxjs/toolkit";

import loompaApi from "../services/loompas";

const store = configureStore({
  reducer: {
    [loompaApi.reducerPath]: loompaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loompaApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export default store;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
