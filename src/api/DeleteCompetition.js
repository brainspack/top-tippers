import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deleteCompetitionApi = createApi({
  reducerPath: "deleteCompetitionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deleteCompetitionByName: builders.mutation({
      query: (body) => ({
        url: "/api/competition/deleteCompetition",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteCompetitionByNameMutation } = deleteCompetitionApi;
export default deleteCompetitionApi;
