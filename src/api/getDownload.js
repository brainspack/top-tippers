import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const getDownloadApi = createApi({
  reducerPath: "getDownloadApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getUserGetDownloadByName: builders.query({
      query: ({ compId, startDate, endDate }) => ({
        url: "api/competition/getdownload",
        method: "GET",
        params: {
          compId,
          startDate,
          endDate,
        },
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useLazyGetUserGetDownloadByNameQuery } = getDownloadApi;
export default getDownloadApi;
