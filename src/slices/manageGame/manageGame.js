import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameData: {},
  allTeamData: {},
  editGameData: [],
  selectedGameMode: "",
  openGameModal: false,
  gameModalData: [],
  filterdGameData: [],
  openDeclareWinnerModal: false,
  declareWinnerData: [],
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
    getGameDataForEdit: (state, { payload }) => {
      state.editGameData = payload;
    },
    setSelectedGameMode: (state, { payload }) => {
      state.selectedGameMode = payload;
    },
    updateGameModalState: (state, { payload }) => {
      state.openGameModal = payload;
    },
    updateGameModalData: (state, { payload }) => {
      state.gameModalData = payload;
    },
    updateFilteredGameData: (state, { payload }) => {
      state.filterdGameData = payload;
    },
    updateDeclareWinnerModalState: (state, { payload }) => {
      state.openDeclareWinnerModal = payload;
    },
    updateDeclareWinnerData: (state, { payload }) => {
      state.declareWinnerData = payload;
    },
  },
});

export const {
  updateGameList,
  updateAllTeamData,
  getGameDataForEdit,
  setSelectedGameMode,
  updateGameModalState,
  updateGameModalData,
  updateFilteredGameData,
  updateDeclareWinnerModalState,
  updateDeclareWinnerData,
} = manageGameSlice.actions;
export default manageGameSlice.reducer;
