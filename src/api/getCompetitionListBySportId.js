import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";

export const userCompetitionListBySportIdApi = createApi({
  reducerPath: "userCompetitionListBySportIdApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    userCompetitionListBySportIdApiByName: builders.mutation({
      query: (body) => ({
        url: "/api/competition/getCompListbySportId",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useUserCompetitionListBySportIdApiByNameMutation } =
  userCompetitionListBySportIdApi;
export default userCompetitionListBySportIdApi;
