import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const addArticleApi = createApi({
  reducerPath: "addArticleApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    addArticleByName: builders.mutation({
      query: (body) => ({
        url: "/api/article/addarticle",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useAddArticleByNameMutation } = addArticleApi;
export default addArticleApi;
