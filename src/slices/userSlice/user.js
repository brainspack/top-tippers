import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isModalVisible: false,
  isSendModalVisible: false,
  modalSportName: "",
  setEditData: null,
  buttonClickedForModal: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUserData: (state, { payload }) => {
      const changedData = payload.map((user) => {
        return {
          ...user,
          isTopSportUser: user.isTopSportUser ? "Yes" : "No",
          isVerified: user.isVerified ? "Yes" : "No",
        };
      });
      state.data = changedData;
    },
    updateModalVisibility: (state, { payload }) => {
      state.isModalVisible = payload;
    },
    updateSendModalVisibility: (state, { payload }) => {
      state.isSendModalVisible = payload;
    },

    setModalSportName: (state, action) => {
      state.modalSportName = action.payload;
    },
    getUserDataForEdit: (state, { payload }) => {
      console.log(payload, "DATA");
      state.setEditData = payload;
    },
    knowWhereHaveToOpenModal: (state, { payload }) => {
      console.log(payload);
      state.buttonClickedForModal = payload;
    },
  },
});

export const {
  updateUserData,
  updateModalVisibility,
  setModalSportName,
  getUserDataForEdit,
  knowWhereHaveToOpenModal,
  updateSendModalVisibility,
} = userSlice.actions;

export default userSlice.reducer;
