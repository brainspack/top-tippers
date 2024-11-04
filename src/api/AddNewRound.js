import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const addRoundApi = createApi({
  reducerPath: "addRoundApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    addRoundByName: builders.mutation({
      query: ({ body }) => ({
        url: "/api/round/addRound",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useAddRoundByNameMutation } = addRoundApi;
export default addRoundApi;
