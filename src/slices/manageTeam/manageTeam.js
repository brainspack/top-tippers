import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

export const manageSlice = createSlice({
  name: "manageSlice",
  initialState,
  reducers: {
    updateListSport: (state, { payload }) => {
      //   const { state: open, message, severity } = payload;
      //   state.value = {
      //     state: open,
      //     message: message || null,
      //     severity: severity || "info",
      //   };
    },
  },
});

export const { updateListSport } = manageSlice.actions;
export default manageSlice.reducer;
