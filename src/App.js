import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DashboardComp from "../src/components/Dashboard/Dashboard.jsx";
import Login from "./components/LoginPage/LoginPage.jsx";
import { OpenNotification } from "./components/Snackbar.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardComp />} />
      </Routes>
      <OpenNotification />
    </div>
  );
}

export default App;
