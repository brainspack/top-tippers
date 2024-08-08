import React from "react";
import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import ManageTeam from "../../components/master/ManageTeam";

const ManageTeamComponent = (props) => {
  return (
    <>
      <Box>
        <DashboardComponent content={<ManageTeam />} />
      </Box>
    </>
  );
};

export default ManageTeamComponent;
