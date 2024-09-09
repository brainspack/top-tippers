import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adData: {},
};

export const adSlice = createSlice({
  name: "adSlice",
  initialState,
  reducers: {
    updateAdData: (state, { payload }) => {
      state.adData = payload;
    },
  },
});

export const { updateAdData } = adSlice.actions;
export default adSlice.reducer;
