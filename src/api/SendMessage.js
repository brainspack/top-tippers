import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constant";
export const sendMessageApi = createApi({
  reducerPath: "sendMessageApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    sendMessageByName: builders.mutation({
      query: (body) => ({
        url: "/api/user/sendMessage",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useSendMessageByNameMutation } = sendMessageApi;
export default sendMessageApi;
