import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const sendSportNotificaticationApi = createApi({
  reducerPath: "sendSportNotificaticationApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getSendSportNotificaticationApiByName: builders.mutation({
      query: (body) => ({
        url: "api/sport/sendSportNotificatication",
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useGetSendSportNotificaticationApiByNameMutation } =
  sendSportNotificaticationApi;
export default sendSportNotificaticationApi;
