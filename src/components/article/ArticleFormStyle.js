import {
  Box,
  Button,
  InputBase,
  Paper,
  styled,
  Typography,
} from "@mui/material";

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
  gap: "20px",
}));
export const FormInner = styled(Box)(() => ({
  width: "100%",
  height: "70px",
  display: "flex",
  justifyContent: "space-between",
}));

export const CustomBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: "7px 20px",
  fontWeight: 550,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));
