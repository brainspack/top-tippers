import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sportData: {},
};

export const manageSportSlice = createSlice({
  name: "manageSportSlice",
  initialState,
  reducers: {
    updateSportData: (state, { payload }) => {
      state.sportData = payload;
    },
  },
});

export const { updateSportData } = manageSportSlice.actions;
export default manageSportSlice.reducer;
