import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banterCompetitionListData: [],
};

export const banterSlice = createSlice({
  name: "banterSlice",
  initialState,
  reducers: {
    updateBanterCompetitionListData: (state, { payload }) => {
      state.banterCompetitionListData = payload;
    },
  },
});

export const { updateBanterCompetitionListData } = banterSlice.actions;
export default banterSlice.reducer;
