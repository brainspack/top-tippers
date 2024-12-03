import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const deleteQuestionApi = createApi({
  reducerPath: "deleteQuestionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    DeleteQuestionApiByName: builders.mutation({
      query: (body) => ({
        url: "/question/deleteQuestion",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteQuestionApiByNameMutation } = deleteQuestionApi;
export default deleteQuestionApi;
