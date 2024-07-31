import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUserData: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;
