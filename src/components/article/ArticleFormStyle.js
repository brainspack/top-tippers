import { Box, InputBase, Paper, styled, Typography } from "@mui/material";

export const ArticleFormContainer = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
}));
export const ArticleFormWrapper = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));
export const FormInner = styled(Box)(() => ({
  width: "100%",
  height: "70px",
  //   backgroundColor: "red",
  display: "flex",
  gap: "5px",
}));
