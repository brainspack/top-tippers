import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banterCompetitionListData: [],
  //   faqsListTopicData: {},
  //   setEditFaqsData: null,
  //   setModeForFaqsEdit: "",
  //   isAddFaqsModalVisible: false,
};

export const banterSlice = createSlice({
  name: "banterSlice",
  initialState,
  reducers: {
    updateBanterCompetitionListData: (state, { payload }) => {
      state.banterCompetitionListData = payload;
    },
    // updateFaqsListTopicData: (state, { payload }) => {
    //   state.faqsListTopicData = payload;
    // },
    // getFaqsDataForEdit: (state, { payload }) => {
    //   state.setEditFaqsData = payload;
    // },
    // updateModeForEdit: (state, { payload }) => {
    //   state.setModeForFaqsEdit = payload;
    // },
    // updateAddFaqsModalVisibility: (state, { payload }) => {
    //   state.isAddFaqsModalVisible = payload;
    // },
  },
});

export const {
  //   updatefaqsData,
  //   getFaqsDataForEdit,
  //   updateModeForEdit,
  //   updateAddFaqsModalVisibility,
  //   updateFaqsListTopicData,
  updateBanterCompetitionListData,
} = banterSlice.actions;
export default banterSlice.reducer;
