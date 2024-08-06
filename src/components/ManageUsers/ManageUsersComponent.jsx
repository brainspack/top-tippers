import { Box } from "@mui/material";
import ManageUsers from "./ManageUsers";
import DashboardComponent from "../Dashboard/Dashboard";

const ManageUsersComponent = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<ManageUsers />} />
      </Box>
    </>
  );
};
export default ManageUsersComponent;
