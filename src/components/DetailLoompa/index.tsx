import { LoompaDetail } from "../../types/Loompa";

interface DetailLoompaProps {
  loompa: LoompaDetail;
}
const DetailLoompa = ({ loompa }: DetailLoompaProps) => {
  return (
    <article className="grid grid-cols-4 md:grid-cols-8 gap-x-6 gap-y-6 items-start my-12">
      <div className="col-span-4 ">
        <img src={loompa?.image} loading="lazy" className="w-full h-auto" />
      </div>
      <div className="col-span-4 ">
        <div className="flex flex-col gap-y-1">
          <p className="text-xl font-semibold text-slate-950">
            {loompa?.first_name} {loompa?.last_name}
          </p>
          <p className="text-base font-normal text-gray-600">
            {loompa?.gender}
          </p>
          <p className="text-base font-normal text-gray-600 italic">
            {loompa?.profession}
          </p>
        </div>
        <div className="mt-6">
          <p
            className="text-base"
            dangerouslySetInnerHTML={{
              __html: loompa.description,
            }}
          />
        </div>
      </div>
    </article>
  );
};

export default DetailLoompa;
