import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const addUpdateSportApi = createApi({
  reducerPath: "addUpdateSportApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getAddUpdateSportApiByName: builders.mutation({
      query: (body) => ({
        url: "sports/addupdateSport",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetAddUpdateSportApiByNameMutation } = addUpdateSportApi;
export default addUpdateSportApi;
