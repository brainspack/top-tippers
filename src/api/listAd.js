import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const userListAdApi = createApi({
  reducerPath: "userListAdApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getUserListAdApiApiByName: builders.mutation({
      query: (body) => ({
        url: "/ad/listAd",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.getItem("token")}` },
      }),
    }),
  }),
});
export const { useGetUserListAdApiApiByNameMutation } = userListAdApi;
export default userListAdApi;
