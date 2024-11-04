import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAllData: {},
  currentRowId: "",
  multipleRowId: [],
};

export const messagingSlice = createSlice({
  name: "messagingSlice",
  initialState,
  reducers: {
    updateUserAllData: (state, { payload }) => {
      state.userAllData = payload;
    },
    updateCurrentRowId: (state, { payload }) => {
      state.currentRowId = payload;
    },
    updateMultipleRowId: (state, { payload }) => {
      state.multipleRowId = payload;
    },
  },
});

export const { updateUserAllData, updateCurrentRowId, updateMultipleRowId } =
  messagingSlice.actions;
export default messagingSlice.reducer;
