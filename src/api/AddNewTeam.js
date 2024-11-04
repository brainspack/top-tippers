import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const addTeamApi = createApi({
  reducerPath: "addTeamApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    addTeamByName: builders.mutation({
      query: (body) => ({
        url: "/api/team/addTeam",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useAddTeamByNameMutation } = addTeamApi;
export default addTeamApi;
