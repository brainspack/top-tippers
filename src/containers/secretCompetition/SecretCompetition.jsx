import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import SecretCompetitionContent from "../../components/secretCompetition/SecretCompetitionContent";

const SecretCompetitionPage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<SecretCompetitionContent />} />
      </Box>
    </>
  );
};
export default SecretCompetitionPage;
