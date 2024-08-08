import React from "react";
import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import ManageSport from "../../components/master/ManageSport";

const ManageSportComponent = (props) => {
  return (
    <>
      <Box>
        <DashboardComponent content={<ManageSport />} />
      </Box>
    </>
  );
};

export default ManageSportComponent;
