import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const getArticleDetailsApi = createApi({
  reducerPath: "getArticleDetailsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getArticleDetailsApiByName: builders.query({
      query: ({ _id }) => ({
        url: "api/article/getArticleDetails",
        method: "GET",
        params: {
          _id: _id,
        },
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useLazyGetArticleDetailsApiByNameQuery } = getArticleDetailsApi;
export default getArticleDetailsApi;
