import { Box, Button, Paper, styled, Typography } from "@mui/material";
import bannerImage from "../../images/login-banner.6b372104.png";
import LogoImage from "../../images/logo.svg";

export const MainContainer = styled(Box)(() => ({
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${bannerImage})`,
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const LoginContainerWrapper = styled(Box)(() => ({
  width: "74%",
  height: "540px",
  zIndex: 2,
  display: "flex",
  justifyContent: "flex-end",
}));
export const LoginContainer = styled(Paper)(() => ({
  width: "45%",
  height: "540px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius:"8px"
}));
export const LoginContainerInnerWrapper = styled(Box)(() => ({
  width: "85%",
  height: "480px",
}));
export const LogoImageWrapper = styled(Box)(() => ({
  width: "100%",
  height: "80px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
  
}));
export const LogoImageBox = styled(Box)(() => ({
  width: "80%",
  height: "40px",
  backgroundImage:`url(${LogoImage})`,
  backgroundRepeat:"no-repeat",
  
  
  
}));
export const LoginHeadingWrapper = styled(Box)(() => ({
  width: "100%",
  height: "40px",
  
}));
export const LoginHeading = styled(Typography)(() => ({
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  width: "100%",
  height: "40px",
  fontWeight:"600",
  color:"#073141 !important",
  fontSize:"36px"

}));
export const InputWrapper = styled(Box)(() => ({
    width:"100%",
    height:"220px",
    // backgroundColor:"red",
    display:"flex",
    alignItems:"center"

}));
export const InputBox = styled(Box)(() => ({
    width:"100%",
    height:"180px",
    // backgroundColor:"yellow",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around"

}));
export const LoginButton = styled(Button)(() => ({
    width:"100%",
    height:"40px",
    backgroundColor:"blue",
    color:"white",
    textTransform:"none !important",
    "&:hover":{
        backgroundColor: "blue !important"
    }
    

}));
export const ForgotPasswordWrapper = styled(Box)(() => ({
   width:"100%",
   height:"50px",
   textAlign:"end"
    

}));
export const ForgotPassword = styled(Typography)(() => ({
   width:"100%",
   height:"50px",
   fontSize:"14px",
   color:"blue"
    

}));
