import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const versionListApi = createApi({
  reducerPath: "versionListApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getVersionListApiByName: builders.mutation({
      query: (body) => ({
        url: "/version/versionList",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetVersionListApiByNameMutation } = versionListApi;
export default versionListApi;
