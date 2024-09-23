import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constant";
export const gameTippingCountApi = createApi({
  reducerPath: "gameTippingCountApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builders) => ({
    getGameTippingCountApiByName: builders.query({
      query: ({ round, sport }) => ({
        url: "api/game/gametippingcount",
        method: "GET",
        params: {
          round: round,
          sport: sport,
        },
        headers: { Authorization: `Bearer${localStorage.token}` },
      }),
    }),
  }),
});
export const { useLazyGetGameTippingCountApiByNameQuery } = gameTippingCountApi;
export default gameTippingCountApi;
