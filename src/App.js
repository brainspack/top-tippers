import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import DashboardComp from "./components/Dashboard";
import { SuccessSnackbar } from "./components/Snackbar";

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
