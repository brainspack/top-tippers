import { Grid, Box } from "@mui/material";
// import MiniDrawer from "./AppBar";
import { Outlet } from "react-router-dom";
import DashboardComponent from "./Dashboard";
import DashboardContent from "../DashboardContent/DashboardContent";

const DashboardPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<DashboardContent />} />
      </Box>
    </>
  );
};
export default DashboardPage;
