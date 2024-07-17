import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Loompa, LoompaDetail } from "../types/Loompa";

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
  tagTypes: ["Loompa"],
  endpoints: (build) => ({
    getLoompaById: build.query<LoompaDetail, string>({
      query: (id) => `/${id}`,
      providesTags: ["Loompa"],
      transformResponse: (response: LoompaDetail, meta, arg) => {
        return {
          ...response,
          id: arg,
        };
      },
    }),
    getAllItems: build.query<Loompa[], void>({
      keepUnusedDataFor: 10,
      providesTags: ["Loompa"],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        let page = 1;
        let hasMore = true;

        let thisData: ListResponse<Loompa> = {
          current: 1,
          total: 0,
          results: [],
        };

        while (hasMore) {
          const { data, error } = await baseQuery(`?page=${page}`);

          const res = data as ListResponse<Loompa>;

          if (error) {
            return { error: error };
          }

          thisData = {
            ...res,
            results: [...thisData.results, ...res.results],
          };

          hasMore = res?.current < res?.total;
          page += 1;
        }

        return {
          data: thisData?.results,
        };
      },
    }),
    // Example scroll infinite and pagination with RTK Query
    // getLoompasByPage: build.query<ListResponse<Loompa>, number | void>({
    //   keepUnusedDataFor: 86400, // 24 horas en segundos
    //   query: (page = 1) => `?page=${page}`,
    //   serializeQueryArgs: ({ endpointName }) => {
    //     return endpointName;
    //   },
    // forceRefetch({ currentArg, previousArg }) {
    //   return currentArg !== previousArg;
    // },
    //   merge: (cache, response) => {
    //     const mergedItems = [
    //       ...cache.results,
    //       ...response.results.filter(
    //         (newItem) =>
    //           !cache.results.some(
    //             (existingItem) => existingItem.id === newItem.id
    //           )
    //       ),
    //     ];

    //     return {
    //       ...cache,
    //       ...response,
    //       results: mergedItems,
    //     };
    //   },
    // }),
  }),
});

export default api;

export const { useGetLoompaByIdQuery, useGetAllItemsQuery } = api;
