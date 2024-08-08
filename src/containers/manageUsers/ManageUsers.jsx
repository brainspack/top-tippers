import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import ManageUsers from "../../components/ManageUsers/ManageUsers";

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
