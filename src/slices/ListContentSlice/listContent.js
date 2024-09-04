import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userListContentData: {},
  isEditRulesModalVisible: false,
  setEditRulesData: null,
  setModeForRulesEdit: "",
};

export const listContentSlice = createSlice({
  name: "listContentSlice",
  initialState,
  reducers: {
    updateUserListContentData: (state, { payload }) => {
      state.userListContentData = payload;
    },
    updateEditRulesModalVisible: (state, { payload }) => {
      state.isEditRulesModalVisible = payload;
    },
    getEditRulesData: (state, { payload }) => {
      state.setEditRulesData = payload;
    },
    updateModeForRulesEdit: (state, { payload }) => {
      // console.log(payload.rowData, payload, "DATA");
      state.setModeForRulesEdit = payload;
    },
  },
});

export const {
  updateUserListContentData,
  updateEditRulesModalVisible,
  getEditRulesData,
  updateModeForRulesEdit,
} = listContentSlice.actions;
export default listContentSlice.reducer;
