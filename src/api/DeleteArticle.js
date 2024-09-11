import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deleteArticleApi = createApi({
  reducerPath: "deleteArticleApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deleteArticleByName: builders.mutation({
      query: ({ _id, isDeleted, isActive }) => ({
        url: "/api/article/active/delete",
        method: "DELETE",
        params: { _id, isActive, isDeleted },
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteArticleByNameMutation } = deleteArticleApi;
export default deleteArticleApi;
