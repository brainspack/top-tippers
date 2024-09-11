import { Button, styled, Typography } from "@mui/material";

export const CustomCancelButton = styled(Button)(() => ({
  backgroundColor: "#C1C1C1 !important",
  color: "#FFFFFF !important",
  padding: "7px 20px",
  fontSize: "14px !important",
  fontWeight: "550 !important",
}));
export const CustomDeleteButton = styled(Button)(() => ({
  backgroundColor: "#f15e5e !important",
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
  color: "#999 !important",
  fontSize: "20px !important",
}));
