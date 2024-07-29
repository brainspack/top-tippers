import { Alert, Snackbar } from "@mui/material";
// import { ERROR } from "./Constant";
import { useDispatch, useSelector } from "react-redux";
import { handleNotification,  } from "../slices/Snackbar";
export const OpenNotification = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.snackbar.value);
  const handleSnackbarClose = (event, reason) => {
    dispatch(
      handleNotification({
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
        severity={count.severity === 200 ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {count.message}
      </Alert>
    </Snackbar>
  );
};