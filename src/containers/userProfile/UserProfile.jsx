import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import UserProfileContent from "../../components/UserProfile/UserProfileContent";

const UserProfile = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<UserProfileContent />} />
      </Box>
    </>
  );
};
export default UserProfile;
