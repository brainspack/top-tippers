import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const adReportApi = createApi({
  reducerPath: "adReportApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    adReportApiByName: builders.mutation({
      query: (body) => ({
        url: "/ad/adReports",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useAdReportApiByNameMutation } = adReportApi;
export default adReportApi;
