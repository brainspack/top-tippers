import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";

export const teamDetailApi = createApi({
  reducerPath: "teamDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    teamDetailsByName: builders.mutation({
      query: (body) => ({
        url: "/api/team/getTeamDetail",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useTeamDetailsByNameMutation } = teamDetailApi;
export default teamDetailApi;
