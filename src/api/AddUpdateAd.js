import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const addUpdateAdApi = createApi({
  reducerPath: "addUpdateAdApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getAddUpdateAdApiByName: builders.mutation({
      query: (body) => ({
        url: "/ad/addUpdateAd",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetAddUpdateAdApiByNameMutation } = addUpdateAdApi;
export default addUpdateAdApi;
