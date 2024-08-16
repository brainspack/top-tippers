import React from "react";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import TeamProfileContent from "../../components/TeamProfile/TeamProfileContent";
import { Box } from "@mui/material";

const TeamDetailProfile = (props) => {
  return (
    <>
      <Box>
        <DashboardComponent content={<TeamProfileContent />} />
      </Box>
    </>
  );
};

export default TeamDetailProfile;
