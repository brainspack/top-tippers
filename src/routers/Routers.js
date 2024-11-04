import { Route, Routes } from "react-router-dom";
import Login from "../components/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "../containers/dashboard/Dashboard";
import ManageUsersComponent from "../containers/manageUsers/ManageUsers";
import MessagingComponent from "../containers/messaging/MessagingComponent";
import UserProfile from "../containers/userProfile/UserProfile";
import ManageSportComponent from "../containers/master/ManageSportComponent";
import ManageTeamComponent from "../containers/master/ManageTeamComponent";
import TeamDetailProfile from "../containers/teamDetail/TeamDetailProfile";
import ManageRoundComponent from "../containers/master/ManageRoundComponent";
import ManageGameComponent from "../containers/master/ManageGameComponent";
import ManageCompetitionComponent from "../containers/master/ManageCompetitionComponent";
import { OpenNotification } from "../components/Snackbar";
import ArticlePage from "../containers/article/Article";
import BanterPage from "../containers/banter/Banter";
import FaqsPage from "../containers/cms/Faqs";
import RulesPage from "../containers/cms/Rules";
import AdsPage from "../containers/ads/Ads";
import AdsReportContent from "../components/ads/AdsReportContent";
import AdsReportPage from "../containers/ads/AdsReport";
import ManageVersionPage from "../containers/manageVersion/ManageVersion";
import SecretCompetitionPage from "../containers/secretCompetition/SecretCompetition";
import AddArticleComponent from "../components/article/AddArticleComponent";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/admin">
          <Route index element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<ManageUsersComponent />} />
            <Route path="messaging" element={<MessagingComponent />} />
            <Route path="userprofile/:userId" element={<UserProfile />} />
            <Route path="sport" element={<ManageSportComponent />} />
            <Route path="team" element={<ManageTeamComponent />} />
            <Route path="teamdetail/:teamId" element={<TeamDetailProfile />} />
            <Route path="round" element={<ManageRoundComponent />} />
            <Route path="game" element={<ManageGameComponent />} />

            <Route
              path="competition"
              element={<ManageCompetitionComponent />}
            />
            <Route path="ladder" element={<ArticlePage />} />
            <Route path="addearticle" element={<AddArticleComponent />} />
            <Route
              path="/admin/editarticle/:articleid"
              element={<AddArticleComponent />}
            />

            <Route path="banter" element={<BanterPage />} />
            <Route path="questions" element={<FaqsPage />} />
            <Route path="content" element={<RulesPage />} />
            <Route path="ads" element={<AdsPage />} />
            <Route path="adreport" element={<AdsReportPage />} />
            <Route path="version" element={<ManageVersionPage />} />
            <Route path="secretcomp" element={<SecretCompetitionPage />} />
          </Route>
        </Route>
      </Routes>
      <OpenNotification />
    </>
  );
};
export default Routers;
