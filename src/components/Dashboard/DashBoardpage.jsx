import { Grid, Box } from "@mui/material";
// import MiniDrawer from "./AppBar";
import { Outlet } from "react-router-dom";
import DashboardComponent from "./Dashboard";

const DashboardPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent />
      </Box>
    </>
  );
};
export default DashboardPage;
