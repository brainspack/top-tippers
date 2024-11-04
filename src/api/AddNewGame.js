import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const addGameApi = createApi({
  reducerPath: "addGameApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    addGameByName: builders.mutation({
      query: (body) => ({
        url: "/api/game/addGames",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useAddGameByNameMutation } = addGameApi;
export default addGameApi;
