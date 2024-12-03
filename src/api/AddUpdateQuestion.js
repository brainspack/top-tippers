import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const addUpdateQuestionApi = createApi({
  reducerPath: "addUpdateQuestionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getAddUpdateQuestionApiByName: builders.mutation({
      query: (body) => ({
        url: "/question/addupdateQuestion",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetAddUpdateQuestionApiByNameMutation } =
  addUpdateQuestionApi;
export default addUpdateQuestionApi;
