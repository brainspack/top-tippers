import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DashboardComp from "../src/components/Dashboard/Dashboard.jsx";
import { Login } from "@mui/icons-material";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardComp />} />
      </Routes>
    </div>
  );
}

export default App;
