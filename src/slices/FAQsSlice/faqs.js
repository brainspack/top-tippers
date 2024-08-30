import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faqsData: [],
  faqsListTopicData: {},
  setEditFaqsData: null,
  isAddFaqsModalVisible: false,
  setModeForFaqsEdit: "",
};

export const faqsSlice = createSlice({
  name: "faqsSlice",
  initialState,
  reducers: {
    updatefaqsData: (state, { payload }) => {
      //   console.log(payload, "payy");

      state.faqsData = payload;
    },
    updateFaqsListTopicData: (state, { payload }) => {
      //   console.log(payload, "payy");

      state.faqsListTopicData = payload;
    },
    getFaqsDataForEdit: (state, { payload }) => {
      //   console.log(payload, "DATA");
      state.setEditFaqsData = payload;
    },
    updateModeForEdit: (state, { payload }) => {
      // console.log(payload.rowData, payload, "DATA");
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
