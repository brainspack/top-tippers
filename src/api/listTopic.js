import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const listTopicApi = createApi({
  reducerPath: "listTopicApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getListTopicApiByName: builders.mutation({
      query: (body) => ({
        url: "/topic/listTopic",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetListTopicApiByNameMutation } = listTopicApi;
export default listTopicApi;
