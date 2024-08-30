import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articleData: {},
};

export const articleSlice = createSlice({
  name: "articleSlice",
  initialState,
  reducers: {
    updateArticleData: (state, { payload }) => {
      state.articleData = payload;
    },
  },
});

export const { updateArticleData } = articleSlice.actions;
export default articleSlice.reducer;
