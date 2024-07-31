import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";

export const listUserApi = createApi({
  reducerPath: "listUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getAdminLoginByName: builders.mutation({
      query: ({ body }) => ({
        url: "/api/f/user/userAdminLogin",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useGetlistUserApiByNameMutation } = listUserApi;
export default listUserApi;