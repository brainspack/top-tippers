import { configureStore } from "@reduxjs/toolkit";
import adminLoginApi from "./api/AdminLogin";
import { setupListeners } from "@reduxjs/toolkit/query";
import snackbarReducer from "../src/slices/Snackbar";
import listUserApi from "./api/listUser";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    [adminLoginApi.reducerPath]: adminLoginApi.reducer,
    [listUserApi.reducerPath]: listUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminLoginApi.middleware,listUserApi.middleware),
});
setupListeners(store.dispatch);
