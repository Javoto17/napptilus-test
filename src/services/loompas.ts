import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Loompa } from "../types/Loompa";

const BASE_URL =
  "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas";

interface ListResponse<T> {
  current: number;
  results: T[];
  total: number;
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  reducerPath: "loompaApi",
  tagTypes: ["Loompas", "Loompa"],
  endpoints: (build) => ({
    getLoompaById: build.query<Loompa, string>({
      query: (id) => `/${id}`,
      providesTags: ["Loompa"],
    }),
    getLoompasByPage: build.query<ListResponse<Loompa>, number | void>({
      query: (page = 1) => `?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      merge: (cache, response) => {
        const mergedItems = [
          ...cache.results,
          ...response.results.filter(
            (newItem) =>
              !cache.results.some(
                (existingItem) => existingItem.id === newItem.id
              )
          ),
        ];

        return {
          ...cache,
          ...response,
          results: mergedItems,
        };
      },
    }),
  }),
});

export default api;

export const { useGetLoompaByIdQuery, useGetLoompasByPageQuery } = api;
