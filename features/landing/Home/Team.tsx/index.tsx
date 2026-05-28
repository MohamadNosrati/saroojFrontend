import { TeamatesRoute } from "@/lib/routes/apiRoutes";
import TeamItem from "./TeamItem";
import { ITeamate } from "@/lib/types/teamate";
import { getData } from "@/lib/services/data";
import { IBaseResponse } from "@/lib/types/base";

const Team = async () => {
  const data = await getData<IBaseResponse<ITeamate[]>>(TeamatesRoute.getAll());
  return (
    <section className="lg:pt-20 dark:bg-dark bg-white relative lg:pb-48 md:pt-14 md:pb-32 sm:pt-10 sm:pb-28 pt-6 pb-24">
      <h5 className="text-center text-primary text-2xl font-bold">تیم ساروج</h5>
      <div className="grid  container relative z-10 lg:mt-12 mt-8 grid-cols-12 gap-y-12 sm:gap-8">
        {data?.data?.map((item: ITeamate) => (
          <TeamItem item={item} key={item?.id} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 lg:h-80 h-40 bg-gradient-to-t from-primary via-primary/30 z-0 to-transparent w-full" />
    </section>
  );
};

export default Team;
