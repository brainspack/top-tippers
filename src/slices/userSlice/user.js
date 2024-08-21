import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isModalVisible: false,
  modalSportName: "",
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
    setModalSportName: (state, action) => {
      state.modalSportName = action.payload;
    },
  },
});

export const { updateUserData, updateModalVisibility, setModalSportName } =
  userSlice.actions;

export default userSlice.reducer;
