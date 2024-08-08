import React from "react";
import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import ManageCompetition from "../../components/master/ManageCompetition";

const ManageCompetitionComponent = (props) => {
  return (
    <>
      <Box>
        <DashboardComponent content={<ManageCompetition />} />
      </Box>
    </>
  );
};

export default ManageCompetitionComponent;
