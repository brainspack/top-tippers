import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const downloadCsvApi = createApi({
  reducerPath: "downloadCsvApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    downloadCsvByName: builders.mutation({
      query: () => ({
        url: "/api/user/downloadCsv",
        method: "POST",
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDownloadCsvByNameMutation } = downloadCsvApi;
export default downloadCsvApi;
