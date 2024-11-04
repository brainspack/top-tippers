import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    state: false,
    message: "",
    severity: "info",
  },
};

export const counterSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    handleNotification: (state, { payload }) => {
      console.log(payload, "payload");
      const { state: open, message, severity } = payload;
      state.value = {
        state: open,
        message: message || null,
        severity: severity || "info",
      };
    },
  },
});

export const { handleNotification } = counterSlice.actions;
export default counterSlice.reducer;
