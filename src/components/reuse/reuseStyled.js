import { Button, styled, Typography } from "@mui/material";

export const CustomCancelButton = styled(Button)(() => ({
  // backgroundColor: "#C1C1C1 !important",
  color: "black !important",
  padding: "7px 20px",
  fontSize: "14px !important",
  fontWeight: "550 !important",
  "&:hover": {
    backgroundColor: "#c1c1c1ba !important",
  },
}));
export const CustomDeleteButton = styled(Button)(() => ({
  backgroundColor: "#e5a842 !important",
  color: "#FFFFFF !important",
  padding: "7px 20px",
  fontSize: "14px !important",
  fontWeight: "550 !important",
}));
export const DeleteHeading = styled(Typography)(() => ({
  color: "#1b1525 !important",
  fontSize: "25px !important",
}));
export const DeleteContent = styled(Typography)(() => ({
  width: "100%",
  color: "#999 !important",
  fontSize: "20px !important",
}));
export const InputWrapperBox = styled(Typography)(() => ({
  height: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));
