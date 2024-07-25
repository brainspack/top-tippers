import { configureStore } from "@reduxjs/toolkit";
import adminLoginApi from "./api/AdminLogin";

export const store = configureStore({
  reducer: {
    [adminLoginApi.reducerPath]: adminLoginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminLoginApi.middleware),
});
setupListeners(store.dispatch);
