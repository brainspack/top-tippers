import { NightShelter } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { he } from "date-fns/locale";

const initialState = {
  filterSecretData: {},
  tipDistributionData: {},
  activeUsersData: 0,
  secretAllTeamData: {},
};

export const secretCompetitionSlice = createSlice({
  name: "secretCompetitionSlice",
  initialState,
  reducers: {
    updateFilterSecretAllData: (state, { payload }) => {
      state.filterSecretData = payload;
    },
    updateTipDistributionData: (state, { payload }) => {
      state.tipDistributionData = payload;
    },
    updateActiveUsersData: (state, { payload }) => {
      state.activeUsersData = payload;
    },
    updateSecretAllTeamData: (state, { payload }) => {
      state.secretAllTeamData = payload;
    },
  },
});

export const {
  updateFilterSecretAllData,
  updateTipDistributionData,
  updateActiveUsersData,
  updateSecretAllTeamData,
} = secretCompetitionSlice.actions;
export default secretCompetitionSlice.reducer;
