import React from "react";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import MessagingContent from "../../components/messaging/MessagingContent";
import { Box } from "@mui/material";

const MessagingComponent = (props) => {
  return (
    <>
      <Box>
        <DashboardComponent content={<MessagingContent />} />
      </Box>
    </>
  );
};

export default MessagingComponent;
