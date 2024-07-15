import { Loompa } from "../../types/Loompa";

const CardLoompa = (loompa: Loompa) => {
  return (
    <div>
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

        <p className="text-base font-normal text-gray-400">{loompa?.gender}</p>

        <p className="text-base font-normal text-gray-400 italic">
          {loompa?.profession}
        </p>
      </div>
    </div>
  );
};

export default CardLoompa;
