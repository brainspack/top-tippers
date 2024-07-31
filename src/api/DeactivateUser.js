import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deactivateUserApi = createApi({
  reducerPath: "deactivateUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deactivateUserByName: builders.mutation({
      query: (body) => ({
        url: "/api/user/deActivateUser",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeactivateUserByNameMutation } = deactivateUserApi;
export default deactivateUserApi;
