import { Box, Button, Paper, styled, Typography } from "@mui/material";


export const DashboardMainContainer = styled(Box)(() => ({
  width: "100%",
  height: "500px",
  backgroundColor:"red"

}));
export const DashboardCardWrapper = styled(Box)(() => ({
  width: "100%",
  height: "170px",
  backgroundColor:"green",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between"

}));
export const DashboardHeading = styled(Typography)(() => ({
  color: "#262626 !important",
  fontSize: "16px",
  fontWeight:"600",
  backgroundColor:"yellow"

}));
export const DashboardCardBox = styled(Typography)(() => ({
  width:"100%",
  height:"134px",
  backgroundColor:"orange"

}));
export const DashboardCardInnerBox = styled(Typography)(() => ({
  width:"70%",
  height:"inherit",
  backgroundColor:"yellow"

}));
export const DashboardCardContent = styled(Typography)(() => ({
  width:"80%",
  height:"inherit",
  backgroundColor:"white"

}));