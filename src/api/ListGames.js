import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const listGamesApi = createApi({
  reducerPath: "listGamesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    listGamesByName: builders.mutation({
      query: (body) => ({
        url: "/api/game/listGames",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useListGamesByNameMutation } = listGamesApi;
export default listGamesApi;
