import { Box, Button, InputBase, Paper, styled, Typography } from "@mui/material";

export const AddSportBtn = styled(Button)(() => ({
    outline:"none",
    border:"1px solid black",
    color:"black",
    textTransform:"none"

  }));
export const SportModalHeading = styled(Typography)(() => ({
    backgroundColor:"#3834340d",
    padding:"10px 15px",
    fontSize:"16px",
    fontWeight:"600",
    width:"100%",
    display:"flex",
     justifyContent:"space-between"

  }));
export const BackModalBtn = styled(Button)(() => ({
    outline:"none",
    border:"1px solid black",
    color:"black",
    textTransform:"none",
    marginRight:"10px"

  }));
export const AddSportSubmitBtn = styled(Button)(() => ({
    backgroundColor:"#e08300",
    color:"white",
    textTransform:"none",
    "&:hover":{
        backgroundColor:"#e08300"
    }

  }));