import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamData: {},
  sportData: {},
  selectedSport: "",
  currentModule: "",
};

export const manageSlice = createSlice({
  name: "manageSlice",
  initialState,
  reducers: {
    updateTeamList: (state, { payload }) => {
      state.teamData = payload;
    },
    updateSportList: (state, { payload }) => {
      const newData = [
        {
          _id: "all",
          sportname: "All",
        },
        ...payload.data,
      ];
      console.log(newData, "newData");
      console.log(payload, "PAYLOAD");
      const newObj = {
        ...payload,
        data: newData,
      };
      console.log(newObj, "NEWOBJ");
      state.sportData = newObj;
    },
    updateSelectedSport: (state, { payload }) => {
      state.selectedSport = payload;
    },
    setCurrentModule: (state, { payload }) => {
      state.currentModule = payload;
    },
  },
});

export const {
  updateTeamList,
  updateSportList,
  updateSelectedSport,
  setCurrentModule,
} = manageSlice.actions;
export default manageSlice.reducer;
