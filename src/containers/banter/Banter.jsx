import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import BanterContent from "../../components/banter/BanterContent";

const BanterPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<BanterContent />} />
      </Box>
    </>
  );
};
export default BanterPage;
