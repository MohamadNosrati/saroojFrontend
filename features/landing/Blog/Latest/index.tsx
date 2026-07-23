import { getLocale, getTranslations } from "next-intl/server";

import { getData } from "@/lib/services/data";
import { IBaseResponse, IPaginatedResponse } from "@/lib/types/base";
import { IBlog } from "@/lib/types/blog";
import { blogsRoutes } from "@/lib/routes/apiRoutes";

import LatestBlogItem from "./LatestBlogItem";

export default async function BlogsLatest() {
  const t = await getTranslations("Blogs");
  const locale = await getLocale();
  const data = await getData<IBaseResponse<IPaginatedResponse<IBlog>>>(
    blogsRoutes.getAll({
      limit: 4,
      page: 1,
      asc: false,
      sort: "createdAt",
    }),
  );

  const condition = locale === "fa" ? "title" : "titleEn";

  return (
    <section className="relative lg:pt-24 dark:bg-dark bg-gray-50/50 lg:pb-28 md:pt-16 md:pb-24 sm:pt-12 sm:pb-20 pt-8 pb-16 overflow-hidden">
      {/* SOFT AMBIENT GLOW (Smoothed out to feel highly premium) */}
      <div className="absolute top-0 left-0 lg:h-[450px] h-60 bg-gradient-to-b from-primary/10 via-primary/[0.02] to-transparent z-0 w-full pointer-events-none" />

      {/* DECORATIVE TOP ACCENT LINE */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-10" />

      <div className="container relative z-10 px-4 flex flex-col gap-10">
        {/* SECTION TITLE & CONTEXT GRID */}
        <div className="flex flex-col max-sm:items-center gap-2">
          <h2 className="font-black sm:text-4xl text-2xl text-gray-900 dark:text-white tracking-tight">
            {t("topTitle")}
          </h2>
          <span className="w-16 h-[3px] bg-primary rounded-full" />
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-lighter/60 font-medium max-w-md mt-1 max-sm:text-center">
            {t("description")}
          </p>
        </div>

        {/* LATEST BLOG ITEMS GRID GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {data?.data?.result
            ?.filter((item) => item?.isActive)
            ?.filter((item) => item[condition])
            ?.map((item) => <LatestBlogItem key={item?.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
