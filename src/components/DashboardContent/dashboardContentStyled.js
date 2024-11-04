import { Box, styled, Typography } from "@mui/material";
import analysisChart from "../../images/dummy-chart.png";

export const DashboardMainContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "565px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    height: "1155px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "794px",
  },
}));
export const DashboardCardWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "170px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    height: "460px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "290px",
  },
}));
export const DashboardHeading = styled(Typography)(({ theme }) => ({
  color: "#262626 !important",
  fontSize: "16px",
  fontWeight: "600",
  [theme.breakpoints.down("sm")]: {
    height: "50px",
    display: "flex",
    alignItems: "center",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "50px",
  },
}));
export const DashboardCardBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "130px",
  [theme.breakpoints.down("sm")]: {
    height: "420px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "270px",
  },
}));
export const DashboardCardInnerBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "inherit",
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    height: "400px",
    flexDirection: "column",
  },
  [theme.breakpoints.between("sm", "md")]: {
    flexWrap: "wrap",
  },
}));
export const DashboardCard = styled(Box)(({ theme }) => ({
  width: "30%",
  height: "inherit",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #e6ebf1",
  borderRadius: "6px",
  "&:hover": {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 4px 0px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "124px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "48%",
    height: "124px",
  },
}));
export const DashboardCardContentWrapper = styled(Box)(() => ({
  width: "85%",
  height: "90px",
  display: "flex",

  justifyContent: "space-between",
}));
export const DashboardCardiconWrapper = styled(Box)(({ theme }) => ({
  width: "25%",
  height: "90px",
}));
export const DashboardCardContentBox = styled(Box)(({ theme }) => ({
  width: "70%",
  height: "90px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.between("sm", "md")]: {
    width: "64%",
  },
}));
export const DashboardCardContentCount = styled(Box)(() => ({
  width: "100%",
  height: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
export const DashboardCardContentHeading = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "500",
  color: "#8c8c8c",
}));
export const DashboardCardCountNumber = styled(Typography)(() => ({
  fontSize: "17px",
  fontWeight: "600",
}));
export const DashboardCardCountentSubHeading = styled(Typography)(() => ({
  fontSize: "0.75rem",
  fontWeight: "400",
  color: "#8c8c8c",
}));

// ======================= ANALYSIS BOX STYLING ================

export const AnalysisTeamWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "370px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    height: "680px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "500px",
  },
}));
export const AnalysisHeadingWrapper = styled(Box)(() => ({
  width: "100%",
  height: "37px",
  display: "flex",
  alignItems: "end",
}));
export const AnalysisHeading = styled(Typography)(() => ({
  color: "#262626 !important",
  fontSize: "16px",
  fontWeight: "600",
}));
export const AnalysisTeamCardWrapper = styled(Box)(({ theme }) => ({
  width: "47%",
  height: "340px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "340px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    display: "flex",
    width: "100%",
    height: "160px",
  },
}));
export const AnalysisCardAndChartWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.between("sm", "md")]: {
    flexWrap: "wrap",
  },
}));
export const DateSelectWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.between("sm", "md")]: {
    height: "58px",
    width: "32%",
  },
}));
export const AnalysisTeamImageWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "320px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.between("sm", "md")]: {
    height: "305px",
  },
}));
export const AnalysisTeamImage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "280px",
  backgroundImage: `url(${analysisChart})`,
  backgroundSize: "100% 280px",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.between("sm", "md")]: {
    height: "270px",
  },
}));
export const AnalysisCardWrapper = styled(Box)(({ theme }) => ({
  width: "94%",
  height: "260px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    flexDirection: "row",
    height: "140px",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
export const AnalysisCard = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "120px",
  backgroundColor: "white",
  border: "1px solid #e6ebf1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
  "&:hover": {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.between("sm", "md")]: {
    width: "48%",
  },
}));
