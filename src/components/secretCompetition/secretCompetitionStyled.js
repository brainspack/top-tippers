import { Box, Paper, Typography, styled } from "@mui/material";
////////// TIP DISTRIBUTION
export const TipDistributionContainer = styled(Box)(() => ({
  height: "auto",
  width: "100%",
}));
export const TipDistributionHeadingBox = styled(Box)(({ theme }) => ({
  width: "55%",
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  // [theme.breakpoints.between("sm", "md")]: {
  //   width: "60%",
  //   height: "52%",
  // },
  // [theme.breakpoints.between("md", "lg")]: {
  //   width: "50%",
  //   zIndex: 8,
  //   height: "70%",
  // },
}));
export const TipDistributionContentContainer = styled(Box)(() => ({
  height: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
export const TipDistributionContentBox = styled(Box)(({ theme }) => ({
  height: "300px",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "60%",
  },
}));
export const TeamsHeadingBox = styled(Box)(() => ({
  height: "10%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const CustomPaper = styled(Paper)(() => ({
  height: "80%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
}));
export const CustomPaperContentBox = styled(Box)(() => ({
  height: "90%",
  width: "60%",
  display: "flex",
  justifyContent: "space-between",
}));
export const TippingDetailsBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
export const TipDistributionHeading = styled(Typography)(() => ({
  color: "#073141 !important",
  fontSize: "25px !important",
  fontWeight: "700 !important",
}));
export const UserGroupHeading = styled(Typography)(() => ({
  color: "#3e3434 !important",
  fontSize: "20px !important",
  fontWeight: "600 !important",
}));
export const TeamsHeading = styled(Typography)(() => ({
  color: "#212529 !important",
  fontSize: "18px !important",
}));
export const TeamsDetails = styled(Typography)(() => ({
  color: "#212529 !important",
  fontSize: "17px !important",
}));

/////////////////////////////////// SECRET COMPETITION
