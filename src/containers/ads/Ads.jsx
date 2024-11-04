import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import AdsContent from "../../components/ads/AdsContent";

const AdsPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<AdsContent />} />
      </Box>
    </>
  );
};
export default AdsPage;
