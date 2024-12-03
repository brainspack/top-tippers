import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const userListCompetitionApi = createApi({
  reducerPath: "userListCompetitionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getUserListCompetitionApiByName: builders.mutation({
      query: ({ body }) => ({
        url: "api/competition/listCompetition",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.getItem("token")}` },
      }),
    }),
  }),
});
export const { useGetUserListCompetitionApiByNameMutation } =
  userListCompetitionApi;
export default userListCompetitionApi;
