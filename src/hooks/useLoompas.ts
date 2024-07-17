import { useEffect, useMemo, useRef } from "react";
import { filterLoompas, getLoompasByPage } from "../features/loompasSlice";
import { useGetAllItemsQuery } from "../services/loompas";
import CacheService, { STORAGE_KEY } from "../services/storage";
import { useAppDispatch } from "./useDispatch";
import { useAppSelector } from "./useSelector";

export function useLoompas(page?: number, term?: string) {
  const dispatch = useAppDispatch();
  const prevPage = useRef<number | undefined>();

  const { filteredLoompas, loompas } = useAppSelector(
    (state) => state?.loompaReducer
  );
  const { isLoading } = useGetAllItemsQuery(undefined, {
    skip: !CacheService.hasExpired(STORAGE_KEY.LOOMPAS_EXPIRATION),
  });

  const data = useMemo(
    () => (term ? filteredLoompas : loompas),
    [filteredLoompas, loompas, term]
  );

  const totalItems = useMemo(() => {
    return data?.total;
  }, [data]);

  useEffect(() => {
    if (page === 1 || page === prevPage.current || term) {
      return;
    }

    dispatch(
      getLoompasByPage({
        page,
        itemsPerPage: 12,
      })
    );

    prevPage.current = page;
  }, [page, dispatch, term]);

  return {
    data: data?.results,
    isLoading,
    filterLoompas: (value: string) => {
      dispatch(
        filterLoompas({
          term: value,
        })
      );
    },
    totalItems,
  };
}
