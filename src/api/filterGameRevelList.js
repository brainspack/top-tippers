import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";

export const filterGameRevelListApi = createApi({
  reducerPath: "filterGameRevelListApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getFilterGameRevelListApiByName: builders.query({
      query: ({ round, sport, teamId, limit }) => ({
        url: "api/ladder/filterGameRevelList",
        method: "GET",
        params: { round, sport, teamId, limit },
        headers: { Authorization: `Bearer ${localStorage.token}` },
      }),
    }),
  }),
});

export const { useLazyGetFilterGameRevelListApiByNameQuery } =
  filterGameRevelListApi;
export default filterGameRevelListApi;
