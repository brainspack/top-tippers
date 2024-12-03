import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const adminLoginApi = createApi({
  reducerPath: "adminLoginApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getAdminLoginByName: builders.mutation({
      query: ({ body }) => ({
        url: "api/f/user/userAdminLogin",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useGetAdminLoginByNameMutation } = adminLoginApi;
export default adminLoginApi;
