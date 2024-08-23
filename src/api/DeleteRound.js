import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deleteRoundApi = createApi({
  reducerPath: "deleteRoundApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deleteRoundByName: builders.mutation({
      query: (body) => ({
        url: "/api/round/deleteRound",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteRoundByNameMutation } = deleteRoundApi;
export default deleteRoundApi;
