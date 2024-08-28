import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameData: {},
};

export const manageGameSlice = createSlice({
  name: "manageGameSlice",
  initialState,
  reducers: {
    updateGameList: (state, { payload }) => {
      state.gameData = payload;
    },
  },
});

export const { updateGameList } = manageGameSlice.actions;
export default manageGameSlice.reducer;
