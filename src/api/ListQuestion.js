import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const listQuestionApi = createApi({
  reducerPath: "listQuestionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getListQuestionApiByName: builders.mutation({
      query: (body) => ({
        url: "/question/listQuestion",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetListQuestionApiByNameMutation } = listQuestionApi;
export default listQuestionApi;
