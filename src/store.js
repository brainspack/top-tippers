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
import messagingReducer from "./slices/messaging/messaging";
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
import versionDataSliceReducer from "./slices/VersionListSlice/versionListSlice";
import getArticleDetailsApi from "./api/getArticleDetails";
import adReducer from "./slices/AdSlice/Ad";
import listContentReducer from "./slices/ListContentSlice/listContent";
import banterSliceReducer from "./slices/BanterSlice/banterSlice";
// import deleteModalSliceReducer from "./slices/deleteModal/deleteModal";
import deleteModalSliceReducer from "./slices/deleteModal/deleteModal";
import secretCompetitionReducer from "./slices/secretCompetition/secretCompetition";
import sendSportNotificaticationApi from "./api/SendSportNotificatication";
import addUpdateQuestionApi from "./api/AddUpdateQuestion";
import listQuestionApi from "./api/ListQuestion";
import deleteQuestionApi from "./api/DeleteQuestion";
import addArticleApi from "./api/AddArticle";
import sendGameNotificationApi from "./api/SendGameStartNotification";
import listTopicApi from "./api/listTopic";
import editArticleApi from "./api/EditArticle";
import updateGameApi from "./api/UpdateGame";
import ArticleGetAndSearchApi from "./api/GetAndSearchArticle";
import userListContentApi from "./api/listContent";
import deleteArticleApi from "./api/DeleteArticle";
import addUpdateContentApi from "./api/addUpdateContent";
import userListAdApi from "./api/listAd";
import deleteAdApi from "./api/DeleteAd";
import sendMessageApi from "./api/SendMessage";
import addUpdateAdApi from "./api/AddUpdateAd";
import listAllUserApi from "./api/ListAllUser";
import adReportApi from "./api/AdReports";
import versionListApi from "./api/versionList";
import deleteVersionApi from "./api/DeleteVersion";
import addVersionApi from "./api/AddVersion";
import filterGameRevelListApi from "./api/filterGameRevelList";
import userCompetitionListBySportIdApi from "./api/getCompetitionListBySportId";
import getDownloadApi from "./api/getDownload";
import gameTippingCountApi from "./api/gametippingcount";
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
    deleteModalSlice: deleteModalSliceReducer,
    adSlice: adReducer,
    listContentSlice: listContentReducer,
    messagingSlice: messagingReducer,
    versionDataSlice: versionDataSliceReducer,
    banterSlice: banterSliceReducer,
    secretCompetitionSlice: secretCompetitionReducer,
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
    [sendGameNotificationApi.reducerPath]: sendGameNotificationApi.reducer,
    [updateTeamApi.reducerPath]: updateTeamApi.reducer,
    [addUpdateSportApi.reducerPath]: addUpdateSportApi.reducer,
    [listRoundsApi.reducerPath]: listRoundsApi.reducer,
    [deleteRoundApi.reducerPath]: deleteRoundApi.reducer,
    [editArticleApi.reducerPath]: editArticleApi.reducer,
    [deleteArticleApi.reducerPath]: deleteArticleApi.reducer,
    [updateRoundApi.reducerPath]: updateRoundApi.reducer,
    [addArticleApi.reducerPath]: addArticleApi.reducer,
    [listGamesApi.reducerPath]: listGamesApi.reducer,
    [deleteCompetitionApi.reducerPath]: deleteCompetitionApi.reducer,
    [setInviteAndCompButtonApi.reducerPath]: setInviteAndCompButtonApi.reducer,
    [sendSportNotificaticationApi.reducerPath]:
      sendSportNotificaticationApi.reducer,
    [addUpdateQuestionApi.reducerPath]: addUpdateQuestionApi.reducer,
    [listQuestionApi.reducerPath]: listQuestionApi.reducer,
    [deleteQuestionApi.reducerPath]: deleteQuestionApi.reducer,
    [listTopicApi.reducerPath]: listTopicApi.reducer,
    [updateGameApi.reducerPath]: updateGameApi.reducer,
    [getArticleDetailsApi.reducerPath]: getArticleDetailsApi.reducer,
    [ArticleGetAndSearchApi.reducerPath]: ArticleGetAndSearchApi.reducer,
    [userListContentApi.reducerPath]: userListContentApi.reducer,
    [addUpdateContentApi.reducerPath]: addUpdateContentApi.reducer,
    [userListAdApi.reducerPath]: userListAdApi.reducer,
    [deleteAdApi.reducerPath]: deleteAdApi.reducer,
    [addUpdateAdApi.reducerPath]: addUpdateAdApi.reducer,
    [adReportApi.reducerPath]: adReportApi.reducer,
    [listAllUserApi.reducerPath]: listAllUserApi.reducer,
    [sendMessageApi.reducerPath]: sendMessageApi.reducer,
    [versionListApi.reducerPath]: versionListApi.reducer,
    [deleteVersionApi.reducerPath]: deleteVersionApi.reducer,
    [addVersionApi.reducerPath]: addVersionApi.reducer,
    [filterGameRevelListApi.reducerPath]: filterGameRevelListApi.reducer,
    [userCompetitionListBySportIdApi.reducerPath]:
      userCompetitionListBySportIdApi.reducer,
    [getDownloadApi.reducerPath]: getDownloadApi.reducer,
    [gameTippingCountApi.reducerPath]: gameTippingCountApi.reducer,
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
      editArticleApi.middleware,
      addTeamApi.middleware,
      addRoundApi.middleware,
      addGameApi.middleware,
      addArticleApi.middleware,
      updateTeamApi.middleware,
      addUpdateSportApi.middleware,
      sendGameNotificationApi.middleware,
      listRoundsApi.middleware,
      getArticleDetailsApi.middleware,
      deleteRoundApi.middleware,
      deleteArticleApi.middleware,
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
      updateGameApi.middleware,
      addUpdateQuestionApi.middleware,
      ArticleGetAndSearchApi.middleware,
      userListContentApi.middleware,
      addUpdateContentApi.middleware,
      userListAdApi.middleware,
      deleteAdApi.middleware,
      addUpdateAdApi.middleware,
      adReportApi.middleware,
      listAllUserApi.middleware,
      sendMessageApi.middleware,
      versionListApi.middleware,
      deleteVersionApi.middleware,
      addVersionApi.middleware,
      filterGameRevelListApi.middleware,
      userCompetitionListBySportIdApi.middleware,
      getDownloadApi.middleware,
      gameTippingCountApi.middleware
    ),
});
setupListeners(store.dispatch);
