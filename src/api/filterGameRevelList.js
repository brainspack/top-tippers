import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const filterGameRevelListApi = createApi({
  reducerPath: "filterGameRevelListApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getFilterGameRevelListApiByName: builders.query({
      query: ({ _id }) => ({
        url: "api/ladder/filterGameRevelList",
        method: "GET",
        params: {
          _id: _id,
        },
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useLazyGetFilterGameRevelListApiByNameQuery } =
  filterGameRevelListApi;
export default filterGameRevelListApi;
