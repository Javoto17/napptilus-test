import debounce from "just-debounce-it";
import { useEffect } from "react";

import CardLoompa from "../CardLoompa";

import { useIntersectionObserver } from "../../hooks/useNearScreen";
import { Loompa } from "../../types/Loompa";

interface ListLoompasProps {
  data?: Loompa[];
  isLoading: boolean;
  onReachEnd?: () => void;
  onClickItem?: (loompa: Loompa) => void;
}

const ListLoompas = ({
  data,
  isLoading,
  onReachEnd,
  onClickItem,
}: ListLoompasProps) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.8,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (typeof onReachEnd !== "function" || !isIntersecting) return;

    if (isIntersecting) {
      const fn = debounce(() => onReachEnd(), 500);

      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, isLoading, ref]);

  const handleClick = (item: Loompa) => {
    if (typeof onClickItem === "function") onClickItem(item);
  };

  return (
    <ul className="list-none grid grid-cols-12 gap-y-6 gap-x-4">
      {data &&
        data?.length > 0 &&
        data.map((loompa: Loompa, i, array) => {
          const isLast = array?.length - 1 === i;

          return (
            <li
              ref={isLast ? ref : undefined}
              key={`list-item-${loompa?.id}`}
              className="col-span-full md:col-span-6 lg:col-span-4"
            >
              <CardLoompa loompa={loompa} onClick={() => handleClick(loompa)} />
            </li>
          );
        })}
    </ul>
  );
};

export default ListLoompas;
