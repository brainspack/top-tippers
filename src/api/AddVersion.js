import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const addVersionApi = createApi({
  reducerPath: "addVersionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getAddVersionApiByName: builders.mutation({
      query: (body) => ({
        url: "version/addversion",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetAddVersionApiByNameMutation } = addVersionApi;
export default addVersionApi;
