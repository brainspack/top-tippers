import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const userListContentApi = createApi({
  reducerPath: "userListContentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getUserListContentApiByName: builders.mutation({
      query: (body) => ({
        url: "/content/listContent",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.getItem("token")}` },
      }),
    }),
  }),
});
export const { useGetUserListContentApiByNameMutation } = userListContentApi;
export default userListContentApi;
