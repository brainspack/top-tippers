import { Box, InputBase, Paper, styled, Typography } from "@mui/material";

export const ManageUsersContainer = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
}));
export const ManageUsersWrapper = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));
export const SearchContainer = styled(Box)(() => ({
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
}));
export const SearchWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
}));

export const ManageUsersHeading = styled(Typography)(({ theme }) => ({
  fontSize: "25px !important",
  color: theme.palette.secondary.main,
  fontWeight: "700 !important",
}));

export const DropDownBox = styled(Box)(() => ({
  height: "40px",
  width: "40px",
  border: "1px solid #383434",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const ManageUserTableWrapper = styled(Box)(() => ({
  width: "100%",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
}));

export const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    color: theme.palette.primary.main,
  },
  color: "rgb(13, 25, 51)",
  marginLeft: 0,
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "rgb(13, 25, 51)",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    color: "rgb(13, 25, 51) !important",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "rgb(13, 25, 51)",
    },
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "38ch",
      },
    },
  },
}));
