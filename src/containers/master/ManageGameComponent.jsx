import React from "react";
import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import ManageGame from "../../components/master/ManageGame";

const ManageGameComponent = (props) => {
  return (
    <>
      <Box>
        <DashboardComponent content={<ManageGame />} />
      </Box>
    </>
  );
};

export default ManageGameComponent;
