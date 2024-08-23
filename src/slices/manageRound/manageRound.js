import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roundData: {},
  //   sportData: {},
};

export const manageRoundSlice = createSlice({
  name: "manageRoundSlice",
  initialState,
  reducers: {
    updateRoundList: (state, { payload }) => {
      state.roundData = payload;
    },
    // updateSportList: (state, { payload }) => {
    //   const newData = [
    //     {
    //       _id: "all",
    //       sportname: "All",
    //     },
    //     ...payload.data,
    //   ];
    //   console.log(newData, "newData");
    //   console.log(payload, "PAYLOAD");
    //   const newObj = {
    //     ...payload,
    //     data: newData,
    //   };
    //   console.log(newObj, "NEWOBJ");
    //   state.sportData = newObj;
    // },
  },
});

export const { updateRoundList, updateSportList } = manageRoundSlice.actions;
export default manageRoundSlice.reducer;
