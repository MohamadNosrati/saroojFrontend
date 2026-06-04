import { getData } from "@/lib/services/data";
import LatestBlogItem from "./LatestBlogItem";
import { IBaseResponse, IPaginatedResponse } from "@/lib/types/base";
import { IBlog } from "@/lib/types/blog";
import { blogsRoutes } from "@/lib/routes/apiRoutes";

export default async function BlogsLatest() {
  const data = await getData<IBaseResponse<IPaginatedResponse<IBlog>>>(
    blogsRoutes.getAll({
      limit: 4,
      page: 1,
      asc:false,
      sort:"createdAt"
    }),
  );
  // console.log(data?.data?.result)
  return (
    <section className="relative lg:pt-20 dark:bg-dark bg-white lg:pb-24 md:pt-14 md:pb-20 sm:pt-10 sm:pb-16 pt-6 pb-12">
      <div className="absolute top-0 left-0 lg:h-80 h-40 bg-gradient-to-b from-primary via-primary/30 z-0 to-transparent w-full" />
      <div className="container grid sm:grid-cols-2 gap-5">
        {data?.data?.result
          ?.filter((item) => item?.isActive)
          ?.map((item) => <LatestBlogItem item={item} key={item?.id} />)}
      </div>
    </section>
  );
}
