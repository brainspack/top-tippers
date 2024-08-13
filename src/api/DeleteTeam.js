import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deleteTeamApi = createApi({
  reducerPath: "deleteTeamApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deleteTeamByName: builders.mutation({
      query: (body) => ({
        url: "/api/team/deleteTeam",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteTeamByNameMutation } = deleteTeamApi;
export default deleteTeamApi;
