import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const updateRoundApi = createApi({
  reducerPath: "updateRoundApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    updateRoundByName: builders.mutation({
      query: ({ body }) => ({
        url: "/api/round/updateRound",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useUpdateRoundByNameMutation } = updateRoundApi;
export default updateRoundApi;
