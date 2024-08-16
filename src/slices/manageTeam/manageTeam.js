import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamData: {},
};

export const manageSlice = createSlice({
  name: "manageSlice",
  initialState,
  reducers: {
    updateListSport: (state, { payload }) => {
      state.teamData = payload;
    },
  },
});

export const { updateListSport } = manageSlice.actions;
export default manageSlice.reducer;
