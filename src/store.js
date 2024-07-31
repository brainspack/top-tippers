import { configureStore } from "@reduxjs/toolkit";
import adminLoginApi from "./api/AdminLogin";
import userListApi from "./api/UserList";
import deactivateUserApi from "./api/DeactivateUser";
import { setupListeners } from "@reduxjs/toolkit/query";
import snackbarReducer from "../src/slices/Snackbar";
import userReducer from "../src/slices/userSlice/user";
export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    userSlice: userReducer,
    [adminLoginApi.reducerPath]: adminLoginApi.reducer,
    [userListApi.reducerPath]: userListApi.reducer,
    [deactivateUserApi.reducerPath]: deactivateUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminLoginApi.middleware,
      userListApi.middleware,
      deactivateUserApi.middleware
    ),
});
setupListeners(store.dispatch);
