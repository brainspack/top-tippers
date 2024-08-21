import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import adminLoginApi from "./api/AdminLogin";
import userListApi from "./api/UserList";
import deactivateUserApi from "./api/DeactivateUser";
import deleteUserApi from "./api/DeleteUser";
import userDetailsApi from "./api/getUserDetails";
import disabledUserApi from "./api/UserDisabled";
import downloadCsvApi from "./api/DownloadCsv";
import verifyUserApi from "./api/VerifyUser";
import teamListApi from "./api/GetTeamList";
import blockTeamApi from "./api/BlockTeam";
import deleteTeamApi from "./api/DeleteTeam";
import teamDetailApi from "./api/TeamDetail";
import addTeamApi from "./api/AddNewTeam";
import updateTeamApi from "./api/UpdateTeam";
import snackbarReducer from "../src/slices/Snackbar";
import userReducer from "../src/slices/userSlice/user";
import manageReducer from "./slices/manageTeam/manageTeam";
import userListCompetitionApi from "./api/listCompetition";
import userListSportApi from "./api/listSport";
import deleteSportApi from "./api/DeleteSport";
import addUpdateSportApi from "./api/AddUpdateSport";
import setInviteAndCompButtonApi from "./api/setInviteAndCompButton";
export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    userSlice: userReducer,
    manageSlice: manageReducer,
    [adminLoginApi.reducerPath]: adminLoginApi.reducer,
    [userListApi.reducerPath]: userListApi.reducer,
    [deactivateUserApi.reducerPath]: deactivateUserApi.reducer,
    [userListCompetitionApi.reducerPath]: userListCompetitionApi.reducer,
    [userListSportApi.reducerPath]: userListSportApi.reducer,
    [userDetailsApi.reducerPath]: userDetailsApi.reducer,
    [disabledUserApi.reducerPath]: disabledUserApi.reducer,
    [downloadCsvApi.reducerPath]: downloadCsvApi.reducer,
    [deleteUserApi.reducerPath]: deleteUserApi.reducer,
    [userDetailsApi.reducerPath]: userDetailsApi.reducer,
    [verifyUserApi.reducerPath]: verifyUserApi.reducer,
    [teamListApi.reducerPath]: teamListApi.reducer,
    [blockTeamApi.reducerPath]: blockTeamApi.reducer,
    [deleteTeamApi.reducerPath]: deleteTeamApi.reducer,
    [teamDetailApi.reducerPath]: teamDetailApi.reducer,
    [deleteSportApi.reducerPath]: deleteSportApi.reducer,
    [addTeamApi.reducerPath]: addTeamApi.reducer,
    [updateTeamApi.reducerPath]: updateTeamApi.reducer,
    [addUpdateSportApi.reducerPath]: addUpdateSportApi.reducer,
    [setInviteAndCompButtonApi.reducerPath]: setInviteAndCompButtonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminLoginApi.middleware,
      userListApi.middleware,
      deactivateUserApi.middleware,
      userListCompetitionApi.middleware,
      userListSportApi.middleware,
      deleteUserApi.middleware,
      userDetailsApi.middleware,
      userListSportApi.middleware,
      disabledUserApi.middleware,
      downloadCsvApi.middleware,
      verifyUserApi.middleware,
      teamListApi.middleware,
      blockTeamApi.middleware,
      deleteTeamApi.middleware,
      teamDetailApi.middleware,
      deleteSportApi.middleware,
      addTeamApi.middleware,
      updateTeamApi.middleware,
      addUpdateSportApi.middleware,
      setInviteAndCompButtonApi.middleware
    ),
});
setupListeners(store.dispatch);
