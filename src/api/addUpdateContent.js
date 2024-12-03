import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const addUpdateContentApi = createApi({
  reducerPath: "addUpdateContentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getAddUpdateContentApiByName: builders.mutation({
      query: (body) => ({
        url: "/content/addupdateContent",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetAddUpdateContentApiByNameMutation } = addUpdateContentApi;
export default addUpdateContentApi;
