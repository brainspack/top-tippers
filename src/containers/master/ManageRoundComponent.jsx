import React from "react";
import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import ManageRound from "../../components/master/ManageRound";

const ManageRoundComponent = (props) => {
  return (
    <>
      <Box>
        <DashboardComponent content={<ManageRound />} />
      </Box>
    </>
  );
};

export default ManageRoundComponent;
