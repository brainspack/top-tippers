import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const updateGameApi = createApi({
  reducerPath: "updateGameApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    updateGameByName: builders.mutation({
      query: ({ body }) => ({
        url: "/api/game/updateGame",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useUpdateGameByNameMutation } = updateGameApi;
export default updateGameApi;
