import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const ArticleGetAndSearchApi = createApi({
  reducerPath: "ArticleGetAndSearchApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getArticleGetAndSearchApiByName: builders.query({
      query: ({ page, rowsPerPage, sortValue, sortOrder }) => ({
        url: "api/article/getAndSearchArticle",
        method: "GET",
        params: {
          page,
          limit: rowsPerPage,
          sortValue,
          sortOrder,
        },
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useLazyGetArticleGetAndSearchApiByNameQuery } =
  ArticleGetAndSearchApi;
export default ArticleGetAndSearchApi;
