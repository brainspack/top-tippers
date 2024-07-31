import { Box, Button, Paper, styled, Typography } from "@mui/material";
import analysisChart from "../../images/dummy-chart.png"


export const DashboardMainContainer = styled(Box)(() => ({
  width: "100%",
  height: "690px",
  // backgroundColor:"red",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between"

}));
export const DashboardCardWrapper = styled(Box)(() => ({
  width: "100%",
  height: "170px",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between"

}));
export const DashboardHeading = styled(Typography)(() => ({
  color: "#262626 !important",
  fontSize: "16px",
  fontWeight:"600",

}));
export const DashboardCardBox = styled(Box)(() => ({
  width:"100%",
  height:"130px",
  // backgroundColor:"orange"

}));
export const DashboardCardInnerBox = styled(Box)(() => ({
  width:"100%",
  height:"inherit",
  display:"flex",
  justifyContent:"space-between"

}));
export const DashboardCard = styled(Box)(() => ({
  width:"30%",
  height:"inherit",
  backgroundColor:"white",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  border:"1px solid #e6ebf1",
  borderRadius:"6px",
  "&:hover":{
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 1px 4px 0px" 
   }

}));
export const DashboardCardContentWrapper = styled(Box)(() => ({
  width:"85%",
  height:"90px",
  display:"flex",
  // flexDirection:"column",
  // justifyContent:"space-between",
  // backgroundColor:"blue",
  justifyContent:"space-between"

}));
export const DashboardCardiconWrapper = styled(Box)(() => ({
  width:"25%",
  height:"90px",
  
  // backgroundColor:"yellow",
  

}));
export const DashboardCardContentBox = styled(Box)(() => ({
  width:"70%",
  height:"90px",
  
  // backgroundColor:"orange",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between",

}));
export const DashboardCardContentCount = styled(Box)(() => ({
  width:"100%",
  height:"50px",
  display:'flex',
  flexDirection:"column",
  justifyContent:"space-between"

}));
export const DashboardCardContentHeading = styled(Typography)(() => ({
 
  fontSize: "15px",
  fontWeight: "500",
  color:"#8c8c8c"
}));
export const DashboardCardCountNumber = styled(Typography)(() => ({
 
  fontSize: "17px",
  fontWeight: "600",
}));
export const DashboardCardCountentSubHeading = styled(Typography)(() => ({
 
  fontSize: "0.75rem",
  fontWeight: "400",
  color:"#8c8c8c"

}));

// ======================= ANALYSIS BOX STYLING ================ 


export const AnalysisTeamWrapper = styled(Box)(() => ({
 
  width:"100%",
  height:"500px",
  // backgroundColor:"yellow",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between"

}));
export const AnalysisHeadingWrapper = styled(Box)(() => ({
 
  width:"100%",
  height:"30px",
  // backgroundColor:"burlywood",
  // display:"flex"

}));
export const AnalysisHeading = styled(Typography)(() => ({
  color: "#262626 !important",
  fontSize: "16px",
  fontWeight:"600",
  

}));
export const AnalysisTeamCardWrapper = styled(Box)(() => ({
 
  width:"47%",
  height:"450px",
  // backgroundColor:"blue"

}));
export const AnalysisTeamImageWrapper = styled(Box)(() => ({
 
  width:"100%",
  height:"450px",
  // backgroundImage:`url(${analysisChart})`

}));
export const AnalysisTeamImage = styled(Box)(() => ({
 
  width:"100%",
  height:"280px",
  backgroundImage:`url(${analysisChart})`,
  backgroundSize:"100% 280px",
  backgroundRepeat:"no-repeat"

}));
export const AnalysisCardWrapper = styled(Box)(() => ({
 
  width:"94%",
  height:"260px",
  // backgroundColor:"yellow",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between"

}));
export const AnalysisCard = styled(Box)(() => ({
 
  width:"100%",
  height:"120px",
  backgroundColor:"white",
  border:"1px solid #e6ebf1",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  borderRadius:"6px",
  "&:hover":{
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" 
   }



}));