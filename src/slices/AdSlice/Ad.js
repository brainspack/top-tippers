import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adData: [],
  isAdModalVisible: false,
  setEditDataForAd: null,
  buttonClickedForAdModal: "",
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
  },
});

export const {
  updateAdData,
  updateAdModalVisibility,
  getUserAdDataForEdit,
  knowWhereHaveToOpenModalForAd,
} = adSlice.actions;
export default adSlice.reducer;
