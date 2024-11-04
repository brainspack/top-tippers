import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const disabledUserApi = createApi({
  reducerPath: "disabledUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    disabledUserByName: builders.mutation({
      query: () => ({
        url: "/api/user/disableUserToTopSport",
        method: "POST",
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDisabledUserByNameMutation } = disabledUserApi;
export default disabledUserApi;
