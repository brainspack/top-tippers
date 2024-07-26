import { Alert, Snackbar } from "@mui/material";
// import { ERROR } from "./Constant";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../slices/Snackbar";
export const SuccessSnackbar = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.snackbar.value);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(
      increment({
        state: false,
        message: null,
        severity: null,
      })
    );
  };
  return (
    <Snackbar
      open={count?.state}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={count.severity === "admin" ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {count.message}
      </Alert>
    </Snackbar>
  );
};
