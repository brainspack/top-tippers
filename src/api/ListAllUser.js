import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const listAllUserApi = createApi({
  reducerPath: "listAllUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    listAllUserApiByName: builders.mutation({
      query: (body) => ({
        url: "/api/user/listAllUser",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useListAllUserApiByNameMutation } = listAllUserApi;
export default listAllUserApi;
