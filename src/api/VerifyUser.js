import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const verifyUserApi = createApi({
  reducerPath: "verifyUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    verifyUserByName: builders.mutation({
      query: (body) => ({
        url: "/api/user/verifyUser",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useVerifyUserByNameMutation } = verifyUserApi;
export default verifyUserApi;
