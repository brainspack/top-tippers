import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  versionData: {},
  isVersionModalVisible: false,
  //   isSendModalVisible: false,
  //   modalSportName: "",
  setEditVersionData: null,
  buttonClickedForVersionModal: "",
};

export const versionDataSlice = createSlice({
  name: "versionDataSlice",
  initialState,
  reducers: {
    updateUserVersionData: (state, { payload }) => {
      state.versionData = payload;
    },
    updateVersionModalVisibility: (state, { payload }) => {
      state.isVersionModalVisible = payload;
    },
    // updateSendModalVisibility: (state, { payload }) => {
    //   state.isSendModalVisible = payload;
    // },

    // setModalSportName: (state, action) => {
    //   state.modalSportName = action.payload;
    // },
    getVersionDataForEdit: (state, { payload }) => {
      console.log(payload, "DATA");
      state.setEditVersionData = payload;
    },
    knowWhereHaveToOpenModalForVersion: (state, { payload }) => {
      console.log(payload);
      state.buttonClickedForVersionModal = payload;
    },
  },
});

export const {
  //   updateUserData,
  //   updateModalVisibility,
  //   setModalSportName,
  getVersionDataForEdit,
  knowWhereHaveToOpenModalForVersion,
  //   updateSendModalVisibility,
  updateUserVersionData,
  updateVersionModalVisibility,
} = versionDataSlice.actions;

export default versionDataSlice.reducer;
