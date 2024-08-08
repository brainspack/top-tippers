import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleNotification } from "../slices/Snackbar";
export const OpenNotification = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar.value);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      handleNotification({
        state: false,
        message: "",
        severity: snackbar?.severity || "info",
      })
    );
  };
  return (
    <Snackbar
      open={snackbar?.state}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
      // anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbar?.severity === 200 ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar?.message}
      </Alert>
    </Snackbar>
  );
};
