import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/LoginPage/LoginPage.jsx";
import { OpenNotification } from "./components/Snackbar.jsx";
import DashboardComponent from "../src/components/Dashboard/Dashboard.jsx";
import DashboardPage from "./components/Dashboard/DashBoardpage.jsx";
import { DashboardCard } from "./components/DashboardContent/dashboardContentStyled.js";
import DashboardContent from "./components/DashboardContent/DashboardContent.jsx";
import ManageUsers from "./components/ManageUsers/ManageUsers.jsx";
// import UserProfile from "./components/UserProfile.jsx";
import ManageUsersComponent from "./components/ManageUsers/ManageUsersComponent.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import PrivateRoute from "./containers/Routing/PrivateRoute.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin">
          <Route index element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<ManageUsersComponent />} />
            <Route path="userprofile/:userId" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
      <OpenNotification />
    </div>
  );
}

export default App;
