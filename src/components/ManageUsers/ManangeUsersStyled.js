import { Box, styled, Typography } from "@mui/material";

export const ManageUsersContainer = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
}));
export const ManageUsersWrapper = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  padding: "20px",
}));

export const ManageUsersHeading = styled(Typography)(({ theme }) => ({
  fontSize: "25px !important",
  color: theme.palette.secondary.main,
  fontWeight: "700 !important",
}));

export const DropDownBox = styled(Box)(() => ({
  height: "40px",
  width: "40px",
  border: "1px solid #383434",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const ManageUserTableWrapper = styled(Box)(() => ({
 width:"100%"
}));
