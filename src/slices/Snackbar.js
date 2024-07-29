import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    state: false,
    message: null,
    severity: null,
  },
};

export const counterSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    handleNotification: (state, { payload }) => {
      state.value.state = payload.state;
      state.value.message = payload.message;
      state.value.severity = payload.severity;
    },
  },
});

export const { handleNotification } = counterSlice.actions;

export default counterSlice.reducer;
