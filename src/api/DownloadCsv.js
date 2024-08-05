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
        responseHandler: async (response) => {
          if (response.headers.get("Content-Type")?.includes("text/csv")) {
            return response.text();
          } else if (
            response.headers.get("Content-Type")?.includes("application/pdf")
          ) {
            return response.blob();
          } else {
            return response.json();
          }
        },
      }),
    }),
  }),
});
export const { useDownlaodCsvByNameMutation } = downloadCsvApi;
export default downloadCsvApi;
