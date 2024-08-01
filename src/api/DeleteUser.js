import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deleteUserApi = createApi({
  reducerPath: "deleteUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deleteUserByName: builders.mutation({
      query: (body) => ({
        url: "/api/user/deleteUser",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteUserByNameMutation } = deleteUserApi;
export default deleteUserApi;
