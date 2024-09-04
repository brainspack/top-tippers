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
import listRoundsApi from "./api/ListRounds";
import deleteRoundApi from "./api/DeleteRound";
import snackbarReducer from "../src/slices/Snackbar";
import userReducer from "../src/slices/userSlice/user";
import manageReducer from "./slices/manageTeam/manageTeam";
import manageRoundReducer from "./slices/manageRound/manageRound";
import manageGameReducer from "./slices/manageGame/manageGame";
import faqsReducer from "./slices/FAQsSlice/faqs";
import userListCompetitionApi from "./api/listCompetition";
import userListSportApi from "./api/listSport";
import deleteSportApi from "./api/DeleteSport";
import addUpdateSportApi from "./api/AddUpdateSport";
import addRoundApi from "./api/AddNewRound";
import addGameApi from "./api/AddNewGame";
import updateRoundApi from "./api/UpdateRound";
import deleteCompetitionApi from "./api/DeleteCompetition";
import deleteGameApi from "./api/DeleteGame";
import listGamesApi from "./api/ListGames";
import setInviteAndCompButtonApi from "./api/setInviteAndCompButton";
import manageSportReducer from "./slices/manageSport/manageSport";
import articleReducer from "./slices/Article/article";
import listContentReducer from "./slices/ListContentSlice/listContent";
import sendSportNotificaticationApi from "./api/SendSportNotificatication";
import addUpdateQuestionApi from "./api/AddUpdateQuestion";
import listQuestionApi from "./api/ListQuestion";
import deleteQuestionApi from "./api/DeleteQuestion";
import listTopicApi from "./api/listTopic";
import ArticleGetAndSearchApi from "./api/GetAndSearchArticle";
import userListContentApi from "./api/listContent";
import addUpdateContentApi from "./api/addUpdateContent";
export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    userSlice: userReducer,
    manageSlice: manageReducer,
    manageRoundSlice: manageRoundReducer,
    manageGameSlice: manageGameReducer,
    manageSportSlice: manageSportReducer,
    faqsSlice: faqsReducer,
    articleSlice: articleReducer,
    listContentSlice: listContentReducer,
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
    [deleteGameApi.reducerPath]: deleteGameApi.reducer,
    [addTeamApi.reducerPath]: addTeamApi.reducer,
    [addRoundApi.reducerPath]: addRoundApi.reducer,
    [addGameApi.reducerPath]: addGameApi.reducer,
    [updateTeamApi.reducerPath]: updateTeamApi.reducer,
    [addUpdateSportApi.reducerPath]: addUpdateSportApi.reducer,
    [listRoundsApi.reducerPath]: listRoundsApi.reducer,
    [deleteRoundApi.reducerPath]: deleteRoundApi.reducer,
    [updateRoundApi.reducerPath]: updateRoundApi.reducer,
    [listGamesApi.reducerPath]: listGamesApi.reducer,
    [deleteCompetitionApi.reducerPath]: deleteCompetitionApi.reducer,
    [setInviteAndCompButtonApi.reducerPath]: setInviteAndCompButtonApi.reducer,
    [sendSportNotificaticationApi.reducerPath]:
      sendSportNotificaticationApi.reducer,
    [addUpdateQuestionApi.reducerPath]: addUpdateQuestionApi.reducer,
    [listQuestionApi.reducerPath]: listQuestionApi.reducer,
    [deleteQuestionApi.reducerPath]: deleteQuestionApi.reducer,
    [listTopicApi.reducerPath]: listTopicApi.reducer,
    [ArticleGetAndSearchApi.reducerPath]: ArticleGetAndSearchApi.reducer,
    [userListContentApi.reducerPath]: userListContentApi.reducer,
    [addUpdateContentApi.reducerPath]: addUpdateContentApi.reducer,
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
      addRoundApi.middleware,
      addGameApi.middleware,
      updateTeamApi.middleware,
      addUpdateSportApi.middleware,
      listRoundsApi.middleware,
      deleteRoundApi.middleware,
      updateRoundApi.middleware,
      listGamesApi.middleware,
      deleteGameApi.middleware,
      deleteCompetitionApi.middleware,
      setInviteAndCompButtonApi.middleware,
      setInviteAndCompButtonApi.middleware,
      sendSportNotificaticationApi.middleware,
      listQuestionApi.middleware,
      deleteQuestionApi.middleware,
      listTopicApi.middleware,
      addUpdateQuestionApi.middleware,
      ArticleGetAndSearchApi.middleware,
      userListContentApi.middleware,
      addUpdateContentApi.middleware
    ),
});
setupListeners(store.dispatch);
