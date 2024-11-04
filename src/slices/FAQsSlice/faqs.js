import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faqsData: [],
  faqsListTopicData: {},
  setEditFaqsData: null,
  setModeForFaqsEdit: "",
  isAddFaqsModalVisible: false,
};

export const faqsSlice = createSlice({
  name: "faqsSlice",
  initialState,
  reducers: {
    updatefaqsData: (state, { payload }) => {
      state.faqsData = payload;
    },
    updateFaqsListTopicData: (state, { payload }) => {
      state.faqsListTopicData = payload;
    },
    getFaqsDataForEdit: (state, { payload }) => {
      state.setEditFaqsData = payload;
    },
    updateModeForEdit: (state, { payload }) => {
      state.setModeForFaqsEdit = payload;
    },
    updateAddFaqsModalVisibility: (state, { payload }) => {
      state.isAddFaqsModalVisible = payload;
    },
  },
});

export const {
  updatefaqsData,
  getFaqsDataForEdit,
  updateModeForEdit,
  updateAddFaqsModalVisibility,
  updateFaqsListTopicData,
} = faqsSlice.actions;
export default faqsSlice.reducer;
