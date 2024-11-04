import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import RulesContent from "../../components/cms/RulesContent";

const RulesPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<RulesContent />} />
      </Box>
    </>
  );
};
export default RulesPage;
