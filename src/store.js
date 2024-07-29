import { configureStore } from "@reduxjs/toolkit";
import adminLoginApi from "./api/AdminLogin";
import { setupListeners } from "@reduxjs/toolkit/query";
import snackbarReducer from "../src/slices/Snackbar";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    [adminLoginApi.reducerPath]: adminLoginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminLoginApi.middleware),
});
setupListeners(store.dispatch);
