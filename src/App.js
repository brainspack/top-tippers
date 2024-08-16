import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/LoginPage/LoginPage.jsx";
import { OpenNotification } from "./components/Snackbar.jsx";
import DashboardPage from "./containers/dashboard/Dashboard.jsx";
import ManageUsersComponent from "./containers/manageUsers/ManageUsers.jsx";
import UserProfile from "./containers/userProfile/UserProfile.jsx";
import MessagingComponent from "./containers/messaging/MessagingComponent.jsx";
import ManageSportComponent from "./containers/master/ManageSportComponent.jsx";
import ManageTeamComponent from "./containers/master/ManageTeamComponent.jsx";
import ManageCompetitionComponent from "./containers/master/ManageCompetitionComponent.jsx";
import ManageGameComponent from "./containers/master/ManageGameComponent.jsx";
import ManageRoundComponent from "./containers/master/ManageRoundComponent.jsx";
import PrivateRoute from "./routers/PrivateRoute.js";
import TeamDetailProfile from "./containers/teamDetail/TeamDetailProfile.jsx";

const App = () => {
  return (
    <div className="App">
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
          </Route>
        </Route>
      </Routes>
      <OpenNotification />
    </div>
  );
};

export default App;
