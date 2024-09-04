import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const sendGameNotificationApi = createApi({
  reducerPath: "sendGameNotificationApi ",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    sendGameNotificationApiByName: builders.mutation({
      query: (body) => ({
        url: "api/kingbot/sendGameStartNotification",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useSendGameNotificationApiByNameMutation } =
  sendGameNotificationApi;
export default sendGameNotificationApi;
