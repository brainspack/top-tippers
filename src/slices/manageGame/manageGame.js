import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameData: {},
  allTeamData: {},
};
export const manageGameSlice = createSlice({
  name: "manageGameSlice",
  initialState,
  reducers: {
    updateGameList: (state, { payload }) => {
      state.gameData = payload;
    },
    updateAllTeamData: (state, { payload }) => {
      state.allTeamData = payload;
    },
  },
});

export const { updateGameList, updateAllTeamData } = manageGameSlice.actions;
export default manageGameSlice.reducer;
