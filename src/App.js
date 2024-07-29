import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import { SuccessSnackbar } from "./components/Snackbar";
import DashboardComp from "../src/components/Dashboard/Dashboard.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardComp />} />
      </Routes>
      <SuccessSnackbar />
    </div>
  );
}

export default App;
