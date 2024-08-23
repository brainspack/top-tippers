import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const listRoundsApi = createApi({
  reducerPath: "listRoundsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    listRoundsByName: builders.mutation({
      query: (body) => ({
        url: "/api/round/listRounds",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useListRoundsByNameMutation } = listRoundsApi;
export default listRoundsApi;
