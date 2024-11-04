import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const deleteAdApi = createApi({
  reducerPath: "deleteAdApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    deleteAdByName: builders.mutation({
      query: (body) => ({
        url: "/api/ad/deleteAd",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useDeleteAdByNameMutation } = deleteAdApi;
export default deleteAdApi;
