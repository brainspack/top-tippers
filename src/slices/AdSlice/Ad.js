import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adData: [],
  isAdModalVisible: false,
  setEditDataForAd: null,
  buttonClickedForAdModal: "",
  adReportData: {},
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
    getUserAdDataForEdit: (state, { payload }) => {
      // console.log(payload, "DATA");
      state.setEditDataForAd = payload;
    },
    knowWhereHaveToOpenModalForAd: (state, { payload }) => {
      console.log(payload);
      state.buttonClickedForAdModal = payload;
    },
    updateAdReportData: (state, { payload }) => {
      state.adReportData = payload;
    },
  },
});

export const {
  updateAdData,
  updateAdModalVisibility,
  getUserAdDataForEdit,
  knowWhereHaveToOpenModalForAd,
  updateAdReportData,
} = adSlice.actions;
export default adSlice.reducer;
