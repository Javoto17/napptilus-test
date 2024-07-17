import { useParams } from "react-router-dom";

import DetailLoompa from "../../components/DetailLoompa";
import { useAppSelector } from "../../hooks/useSelector";
import { useGetLoompaByIdQuery } from "../../services/loompas";
import CacheService, { STORAGE_KEY } from "../../services/storage";
import { LoompaDetail } from "../../types/Loompa";

const Detail = () => {
  const { id } = useParams();

  const { isLoading } = useGetLoompaByIdQuery(id as string, {
    skip: !CacheService.hasExpired(
      `${STORAGE_KEY.LOOMPA_DETAIL_EXPIRATION}${id}`
    ),
  });

  const data = useAppSelector(
    (state) => state?.loompaReducer?.loompasById?.[id as string]
  );

  if (isLoading || !data) {
    return null;
  }

  return <DetailLoompa loompa={data as LoompaDetail} />;
};

export default Detail;
