import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const updateTeamApi = createApi({
  reducerPath: "updateTeamApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    updateTeamByName: builders.mutation({
      query: (body) => ({
        url: "/api/team/updateTeam",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useUpdateTeamByNameMutation } = updateTeamApi;
export default updateTeamApi;
