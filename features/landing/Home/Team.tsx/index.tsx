import { getTranslations } from "next-intl/server";

import { TeamatesRoute } from "@/lib/routes/apiRoutes";
import { ITeamate } from "@/lib/types/teamate";
import { getData } from "@/lib/services/data";
import { IBaseResponse } from "@/lib/types/base";

import TeamItem from "./TeamItem";

const Team = async () => {
  const t = await getTranslations("Home.team");
  const data = await getData<IBaseResponse<ITeamate[]>>(TeamatesRoute.getAll());

  return (
    <section className="lg:pt-20 dark:bg-dark bg-white relative lg:pb-48 md:pt-14 md:pb-32 sm:pt-10 sm:pb-28 pt-6 pb-24 overflow-hidden">
      {/* SECTION HEADER */}
      <div className="flex flex-col items-center gap-2 mb-2">
        <h5 className="text-center text-primary text-2xl font-extrabold tracking-wide drop-shadow-sm">
          {t("title")}
        </h5>
        <span className="w-12 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
      </div>

      <div className="grid container relative z-10 lg:mt-16 mt-10 grid-cols-12 gap-y-12 sm:gap-x-6 sm:gap-y-16 px-4">
        {data?.data?.map((item: ITeamate) => (
          <TeamItem key={item?.id} item={item} />
        ))}
      </div>

      {/* AMBIENT FOOTER GRADIENT (Smoothed out to feel more premium) */}
      <div className="absolute bottom-0 left-0 lg:h-96 h-48 bg-gradient-to-t from-primary/10 via-primary/[0.02] to-transparent z-0 w-full pointer-events-none" />
    </section>
  );
};

export default Team;
