import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articleData: {},
  filteredArticleData: {},
  selectArticleType: "",
};

export const articleSlice = createSlice({
  name: "articleSlice",
  initialState,
  reducers: {
    updateArticleData: (state, { payload }) => {
      state.articleData = payload;
    },
    updateFilteredArticleData: (state, { payload }) => {
      state.filteredArticleData = payload;
    },
    updateSelectedArticleType: (state, { payload }) => {
      state.selectArticleType = payload;
    },
  },
});

export const {
  updateArticleData,
  updateFilteredArticleData,
  updateSelectedArticleType,
} = articleSlice.actions;
export default articleSlice.reducer;
