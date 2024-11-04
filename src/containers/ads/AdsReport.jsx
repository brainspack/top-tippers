import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import AdsReportContent from "../../components/ads/AdsReportContent";

const AdsReportPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<AdsReportContent />} />
      </Box>
    </>
  );
};
export default AdsReportPage;
