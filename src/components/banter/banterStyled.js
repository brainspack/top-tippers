import {
  Box,
  Button,
  InputBase,
  Paper,
  styled,
  Typography,
} from "@mui/material";
export const BanterFormWrapper = styled(Box)(() => ({
  width: "100%",
  padding: "15px",
  display: "flex",
  justifyContent: "center",
}));
export const BanterFormBox = styled(Box)(() => ({
  width: "70%",
  height: "200px",
  padding: "15px",
}));

export const FilterBtn = styled(Button)(() => ({
  backgroundColor: "#e08300",
  color: "white",
  width: "64px",
  height: "34px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#e08300",
  },
}));
