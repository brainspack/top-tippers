import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/LoginPage/LoginPage.jsx";
import { OpenNotification } from "./components/Snackbar.jsx";
import DashboardComponent from "../src/components/Dashboard/Dashboard.jsx";
import DashboardPage from "./components/Dashboard/DashBoardpage.jsx";
import { DashboardCard } from "./components/DashboardContent/dashboardContentStyled.js";
import DashboardContent from "./components/DashboardContent/DashboardContent.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<DashboardContent />} />
        </Route>
      </Routes>
      <OpenNotification />
    </div>
  );
}

export default App;
