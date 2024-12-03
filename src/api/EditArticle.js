import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const editArticleApi = createApi({
  reducerPath: "editArticleApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    editArticleByName: builders.mutation({
      query: (body) => ({
        url: "/api/article/editeArticle",
        method: "PUT",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useEditArticleByNameMutation } = editArticleApi;
export default editArticleApi;
