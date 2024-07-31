import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const userListApi = createApi({
  reducerPath: "userListApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getUserListByName: builders.mutation({
      query: ({ body }) => ({
        url: "/api/user/listUser",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetUserListByNameMutation } = userListApi;
export default userListApi;
