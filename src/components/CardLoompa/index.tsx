import { Loompa } from "../../types/Loompa";

interface CardLoompaProps {
  loompa: Loompa;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const CardLoompa = ({ loompa, onClick }: CardLoompaProps) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="hover:transition-all hover:scale-105 duration-150 ease-in-out"
    >
      <div className="aspect-video relative rounded-lg">
        <img
          src={loompa?.image}
          loading="lazy"
          className="w-full h-full absolute inset-0 object-cover"
        />
      </div>

      <div className="mt-6 flex flex-col gap-y-1">
        <p className="text-2xl font-semibold text-slate-950">
          {loompa?.first_name} {loompa?.last_name}
        </p>

        <p className="text-base font-normal text-gray-600">{loompa?.gender}</p>

        <p className="text-base font-normal text-gray-600 italic">
          {loompa?.profession}
        </p>
      </div>
    </div>
  );
};

export default CardLoompa;
