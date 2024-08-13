import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const blockTeamApi = createApi({
  reducerPath: "blockTeamApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    blockTeamByName: builders.mutation({
      query: (body) => ({
        url: "/api/team/blockTeam",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useBlockTeamByNameMutation } = blockTeamApi;
export default blockTeamApi;
