import { Box } from "@mui/material";
import UserProfileContent from "./UserProfileContent";
import DashboardComponent from "../Dashboard/Dashboard";

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
