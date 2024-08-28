import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deleteGameApi = createApi({
  reducerPath: "deleteGameApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deleteGameByName: builders.mutation({
      query: (body) => ({
        url: "/api/game/deleteGame",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteGameByNameMutation } = deleteGameApi;
export default deleteGameApi;
