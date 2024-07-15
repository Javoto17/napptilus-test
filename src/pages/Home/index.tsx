import { useState, useCallback } from "react";
import { useGetLoompasByPageQuery } from "../../services/loompas";
import Layout from "../../components/Layout";
import ListLoompas from "../../components/ListLoompas";

const Home = () => {
  const [currentPage, setPage] = useState<number>(1);

  const { data, isLoading } = useGetLoompasByPageQuery(currentPage);

  const onReachEnd = useCallback(() => {
    setPage((prevPage) => (prevPage === data?.total ? prevPage : prevPage + 1));
  }, [data?.total]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center my-20 gap-y-4">
        <h1 className="text-8xl font-semibold text-slate-950 text-balance mx-auto">
          Find your Oompa Loompa
        </h1>

        <p className="text-3xl text-gray-400 text-balance mx-auto">
          Find your Oompa Loompa
        </p>
      </div>
      <ListLoompas
        data={data?.results}
        isLoading={isLoading}
        onReachEnd={onReachEnd}
      />
    </Layout>
  );
};

export default Home;
