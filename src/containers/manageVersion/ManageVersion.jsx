import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import ManageVersionContent from "../../components/manageVersion/ManageVersionContent";

const ManageVersionPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<ManageVersionContent />} />
      </Box>
    </>
  );
};
export default ManageVersionPage;
