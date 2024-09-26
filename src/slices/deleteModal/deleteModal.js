import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteModalVisibility: false,
  modalTitle: "",
  action: () => {},
};

export const deleteModalSlice = createSlice({
  name: "deleteModalSlice",
  initialState,
  reducers: {
    updateDeleteModalVisibility: (state, { payload }) => {
      state.deleteModalVisibility = payload;
    },
    updateModalTitle: (state, { payload }) => {
      state.modalTitle = payload;
    },
    updateAction: (state, { payload }) => {
      state.action = payload;
    },
  },
});

export const { updateDeleteModalVisibility, updateModalTitle, updateAction } =
  deleteModalSlice.actions;
export default deleteModalSlice.reducer;
