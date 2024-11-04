import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const teamListApi = createApi({
  reducerPath: "teamListApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    teamListByName: builders.mutation({
      query: (body) => ({
        url: "/api/team/getTeamList",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useTeamListByNameMutation } = teamListApi;
export default teamListApi;
