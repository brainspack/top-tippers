import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deleteSportApi = createApi({
  reducerPath: "deleteSportApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deleteSportByName: builders.mutation({
      query: (body) => ({
        url: "/sports/deleteSport",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteSportByNameMutation } = deleteSportApi;
export default deleteSportApi;
