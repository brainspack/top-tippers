import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
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
  },
});

export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;
