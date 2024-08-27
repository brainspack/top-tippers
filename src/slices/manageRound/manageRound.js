import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roundData: {},
  roundsEditData: null,
  updateEditData: null,
  isSelectedMode: "",
};

export const manageRoundSlice = createSlice({
  name: "manageRoundSlice",
  initialState,
  reducers: {
    updateRoundList: (state, { payload }) => {
      state.roundData = payload;
    },
    getRoundsDataForEdit: (state, { payload }) => {
      state.roundsEditData = payload;
    },
    getUpdateDataForEdit: (state, { payload }) => {
      state.roundsEditData = payload;
    },

    setSelectedMode: (state, { payload }) => {
      state.isSelectedMode = payload;
    },
  },
});

export const {
  updateRoundList,
  getRoundsDataForEdit,
  setSelectedMode,
  getUpdateDataForEdit,
} = manageRoundSlice.actions;
export default manageRoundSlice.reducer;
