import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adData: [],
  isAdModalVisible: false,
};

export const adSlice = createSlice({
  name: "adSlice",
  initialState,
  reducers: {
    updateAdData: (state, { payload }) => {
      state.adData = payload;
    },
    updateAdModalVisibility: (state, { payload }) => {
      state.isAdModalVisible = payload;
    },
  },
});

export const { updateAdData, updateAdModalVisibility } = adSlice.actions;
export default adSlice.reducer;
