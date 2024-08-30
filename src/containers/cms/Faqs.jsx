import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import BanterContent from "../../components/banter/BanterContent";
import FaqsContent from "../../components/cms/FaqsContent";

const FaqsPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<FaqsContent />} />
      </Box>
    </>
  );
};
export default FaqsPage;
