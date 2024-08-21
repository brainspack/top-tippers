import { Box, Button, Paper, styled, Typography } from "@mui/material";
import bannerImage from "../../images/login-banner.6b372104.png";
import LogoImage from "../../images/logo.svg";
import logInArt from "../../images/login-art.f41b477f.png";
import zIndex from "@mui/material/styles/zIndex";

export const MainContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${bannerImage})`,
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    alignItems: "center",
  },
  [theme.breakpoints.between("sm", "md")]: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
}));
export const LoginContainerBox = styled(Box)(({ theme }) => ({
  width: "57%",
  height: "inherit",
  position: "absolute",
  zIndex: "1",
  backgroundImage: `url(${logInArt})`,
  backgroundSize: "cover",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "80%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "100%",
    height: "80%",
  },
}));
export const LoginContainerWrapper = styled(Box)(({ theme }) => ({
  width: "95%",
  height: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  [theme.breakpoints.between("sm", "md")]: {
    position: "absolute",
    zIndex: 5,
    width: "100%",
    justifyContent: "center",
  },
}));
export const LoginContainer = styled(Paper)(({ theme }) => ({
  width: "37%",
  height: "540px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    width: "97%",
    zIndex: 8,
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "60%",
  },
}));
export const LoginContainerInnerWrapper = styled(Box)(() => ({
  width: "85%",
  height: "480px",
}));
export const LogoImageWrapper = styled(Box)(() => ({
  width: "100%",
  height: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const LogoImageBox = styled(Box)(({ theme }) => ({
  width: "85%",
  height: "40px",
  backgroundImage: `url(${LogoImage})`,
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
export const LoginHeadingWrapper = styled(Box)(() => ({
  width: "100%",
  height: "40px",
}));
export const LoginHeading = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "40px",
  fontWeight: "600",
  color: "#073141 !important",
  fontSize: "36px",
}));
export const InputWrapper = styled(Box)(() => ({
  width: "100%",
  height: "220px",
  display: "flex",
  alignItems: "center",
}));
export const InputBox = styled(Box)(() => ({
  width: "100%",
  height: "190px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
}));
export const LoginButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "40px",
  backgroundColor: theme.palette.primary.main,

  color: "white",
  textTransform: "none !important",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));
export const ForgotPasswordWrapper = styled(Box)(() => ({
  width: "100%",
  height: "50px",
  textAlign: "end",
}));
export const ForgotPassword = styled(Typography)(({ theme }) => ({
  width: "100%",
  height: "50px",
  fontSize: "14px",
  color: theme.palette.primary.main,
}));
