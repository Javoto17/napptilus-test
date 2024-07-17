import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListLoompas from "../../components/ListLoompas";
import { useLoompas } from "../../hooks/useLoompas";
import { Loompa } from "../../types/Loompa";

const Home = () => {
  const [term, setTerm] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const { filterLoompas, data, totalItems, isLoading } = useLoompas(page, term);

  const onReachEnd = useCallback(() => {
    if (term) {
      return;
    }

    setPage((prevPage) =>
      totalItems === data.length ? prevPage : prevPage + 1
    );
  }, [term, totalItems, data]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      filterLoompas(value as string);
      setTerm(value);
    },
    [filterLoompas]
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e?.preventDefault();

      const formData = new FormData(e.target as HTMLFormElement);

      const values = Object.fromEntries(formData);

      setTerm(values?.search as string);
      filterLoompas(values.search as string);
    },
    [filterLoompas]
  );

  const onClickItem = (loompa: Loompa) => {
    navigate(`/${loompa?.id}`);
  };

  return (
    <>
      <form className="flex justify-end my-10" onSubmit={handleSubmit}>
        <div className="border border-solid border-stone-900 rounded-sm flex gap-x-2 divide-x-2 flex-auto lg:flex-initial">
          <input
            name="search"
            className="px-2 py-2 w-full"
            type="search"
            onChange={handleChange}
            placeholder="Search"
          />
          <button
            className="appearance-none hover:opacity-80 px-2 py-1"
            type="submit"
          >
            <img
              src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
      </form>
      <div className="flex flex-col justify-center items-center mt-10 my-20 gap-y-4">
        <h1 className=" text-4xl lg:text-8xl font-semibold text-slate-950 text-center mx-auto">
          Find your Oompa Loompa
        </h1>

        <p className="text-xl lg:text-3xl text-gray-600 text-center lg:text-balance mx-auto">
          Find your Oompa Loompa
        </p>
      </div>

      {isLoading || !data ? (
        <div className="flex items-center justify-center min-h-80">
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        </div>
      ) : (
        <ListLoompas
          data={data}
          isLoading={isLoading}
          onReachEnd={onReachEnd}
          onClickItem={onClickItem}
        />
      )}
    </>
  );
};

export default Home;
