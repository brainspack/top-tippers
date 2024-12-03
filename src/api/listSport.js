import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const userListSportApi = createApi({
  reducerPath: "userListSportApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getUserListSportApiByName: builders.mutation({
      query: (body) => ({
        url: "api/sport/listSport",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.getItem("token")}` },
      }),
    }),
  }),
});
export const { useGetUserListSportApiByNameMutation } = userListSportApi;
export default userListSportApi;
