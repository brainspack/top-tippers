import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import DashboardContent from "../../components/DashboardContent/DashboardContent";

const DashboardPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<DashboardContent />} />
      </Box>
    </>
  );
};
export default DashboardPage;
