import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deleteVersionApi = createApi({
  reducerPath: "deleteVersionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deleteVersionByName: builders.mutation({
      query: (body) => ({
        url: "/version/deleteversion",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteVersionByNameMutation } = deleteVersionApi;
export default deleteVersionApi;
