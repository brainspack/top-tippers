import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const setInviteAndCompButtonApi = createApi({
  reducerPath: "setInviteAndCompButtonApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getSetInviteAndCompButtonApiByName: builders.mutation({
      query: (body) => ({
        url: "/sports/setInviteAndCompButton",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetSetInviteAndCompButtonApiByNameMutation } =
  setInviteAndCompButtonApi;
export default setInviteAndCompButtonApi;
