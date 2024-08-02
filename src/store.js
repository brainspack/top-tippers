import { configureStore } from "@reduxjs/toolkit";
import adminLoginApi from "./api/AdminLogin";
import userListApi from "./api/UserList";
import deactivateUserApi from "./api/DeactivateUser";
import deleteUserApi from "./api/DeleteUser";
import userDetailsApi from "./api/getUserDetails";
import { setupListeners } from "@reduxjs/toolkit/query";
import snackbarReducer from "../src/slices/Snackbar";
import userReducer from "../src/slices/userSlice/user";
import userListCompetitionApi from "./api/listCompetition";
import userListSportApi from "./api/listSport";
export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    userSlice: userReducer,
    [adminLoginApi.reducerPath]: adminLoginApi.reducer,
    [userListApi.reducerPath]: userListApi.reducer,
    [deactivateUserApi.reducerPath]: deactivateUserApi.reducer,
    [userListCompetitionApi.reducerPath]: userListCompetitionApi.reducer,
    [userListSportApi.reducerPath]: userListSportApi.reducer,
    [deleteUserApi.reducerPath]: deleteUserApi.reducer,
    [userDetailsApi.reducerPath]: userDetailsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminLoginApi.middleware,
      userListApi.middleware,
      deactivateUserApi.middleware,
      userListCompetitionApi.middleware,
      userListSportApi.middleware,
      

      deleteUserApi.middleware,
      userDetailsApi.middleware
    ),
});
setupListeners(store.dispatch);
