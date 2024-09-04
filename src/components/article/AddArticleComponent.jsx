import React from "react";
import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import AddArticleForm from "./AddArticleForm";

const AddArticleComponent = (props) => {
  return (
    <>
      <Box>
        <DashboardComponent content={<AddArticleForm />} />
      </Box>
    </>
  );
};

export default AddArticleComponent;
