import { REMEMBER_PERSISTED, REMEMBER_REHYDRATED } from "redux-remember";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../services/loompas";
import CacheService, { STORAGE_KEY } from "../services/storage";
import { Loompa, LoompaDetail } from "../types/Loompa";
import { toLowerCase } from "../utils/string";
import { getTime, getTimeByKind, TimeKind } from "../utils/time";

type LoompaList = {
  results: Loompa[];
  total: number;
};

type LoompasState = {
  loompas: LoompaList;
  filteredLoompas: LoompaList;
  backupFilteredLoompas: Loompa[];
  allLoompas: Loompa[];
  rehydrated: boolean;
  persisted: boolean;
  loompasById: Record<string, LoompaDetail>;
};

interface FilterLoompasArgs {
  term: string;
}
interface GetLoompasByPageArgs {
  page?: number;
  itemsPerPage?: number;
}

const ITEMS_PER_PAGE = 12;

const paginationItems = <T>(
  data: T[],
  page: number = 1,
  itemsPerPage: number = ITEMS_PER_PAGE,
  start: number = 0
) => {
  if (page < 1) {
    throw new Error("Page number must be greater than or equal to 1");
  }

  if (itemsPerPage < 1) {
    throw new Error("Items per page must be greater than or equal to 1");
  }

  const startIndex = start > 0 ? start : (page - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  return data.slice(startIndex, endIndex);
};

const slice = createSlice({
  name: "loompas",
  initialState: {
    allLoompas: [],
    backupFilteredLoompas: [],
    loompasById: {},
    loompas: {
      total: 0,
      results: [],
    },
    filteredLoompas: {
      total: 0,
      results: [],
    },
    rehydrated: false,
    persisted: false,
  } as LoompasState,
  reducers: {
    filterLoompas: (
      state,
      { payload: { term } }: PayloadAction<FilterLoompasArgs>
    ) => {
      const dataFiltered = state.allLoompas.filter((loompa) => {
        const value = toLowerCase(term);

        return (
          toLowerCase(loompa.profession).includes(value) ||
          toLowerCase(loompa.first_name).includes(value) ||
          toLowerCase(loompa.last_name).includes(value)
        );
      });

      state.filteredLoompas.results = dataFiltered;
      state.filteredLoompas.total = dataFiltered?.length;
    },
    getLoompasByPage: (
      state,
      {
        payload: { page = 1, itemsPerPage = ITEMS_PER_PAGE },
      }: PayloadAction<GetLoompasByPageArgs>
    ) => {
      const nextPaginationData = paginationItems(
        state.allLoompas,
        page,
        itemsPerPage,
        state.loompas?.results?.length
      );

      state.loompas = {
        ...state.loompas,
        results: [...state.loompas.results, ...nextPaginationData],
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        createAction<{
          loompaReducer?: LoompasState;
        }>(REMEMBER_REHYDRATED),
        (state, action) => {
          // @INFO: action.payload.myReducer => rehydrated state of this reducer or "undefined" during the first run
          state.loompas = {
            results: action.payload.loompaReducer?.loompas?.results ?? [],
            total: action.payload.loompaReducer?.allLoompas?.length ?? 0,
          };
          state.rehydrated = true;
        }
      )
      .addCase(
        createAction<{ loompaReducer?: LoompasState }>(REMEMBER_PERSISTED),
        (state) => {
          // @INFO: action.payload.myReducer => persisted state of this reducer or "undefined" in case this reducer is not persisted
          state.rehydrated = false;
          state.persisted = true;
        }
      )
      .addMatcher(
        api.endpoints.getAllItems.matchFulfilled,
        (state, { payload }) => {
          CacheService.setItem(
            STORAGE_KEY.LOOMPAS_EXPIRATION,
            getTime() + getTimeByKind(TimeKind.DAY)
          );

          state.loompas = {
            results: paginationItems(payload),
            total: payload?.length,
          };
          state.allLoompas = payload;
        }
      )
      .addMatcher(api.endpoints.getAllItems.matchPending, () => {
        CacheService.clearItem(STORAGE_KEY.LOOMPAS_EXPIRATION);
      })
      .addMatcher(
        api.endpoints.getLoompaById.matchFulfilled,
        (state, { payload }) => {
          state.loompasById = {
            ...state.loompasById,
            [payload?.id]: payload,
          };

          CacheService.setItem(
            `${STORAGE_KEY.LOOMPA_DETAIL_EXPIRATION}${payload?.id}`,
            getTime() + getTimeByKind(TimeKind.DAY)
          );
        }
      )
      .addMatcher(
        api.endpoints.getLoompaById.matchPending,
        (state, { payload }) => {
          CacheService.clearItem(
            `${STORAGE_KEY.LOOMPA_DETAIL_EXPIRATION}${payload}`
          );
        }
      ),
});

export const { filterLoompas, getLoompasByPage } = slice.actions;

export default slice.reducer;
