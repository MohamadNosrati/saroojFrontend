import Carousel from "@/features/landing/SingleProject/Carousel";
import Info from "@/features/landing/SingleProject/Info";
import RelatedProjects from "@/features/landing/SingleProject/RelatedProjects";
import Video from "@/features/landing/SingleProject/Video";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import { IBaseResponse } from "@/lib/types/base";
import { IProject } from "@/lib/types/project";

export default async function SingleProjectPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params)?.slug;
  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");


  const data = await getData<IBaseResponse<IProject>>(
    ProjectsRoute.findBySlug(decodedSlug),
  );

  return (
    <main>
      <section className="bg-gradient-to-b dark:bg-dark bg-white from-primary via-primary/25 to-transparent">
        <div className="container lg:pt-8 pt-6">
          <h1 className="text-center lg:text-4xl sm:text-2xl text-xl font-bold lg:mb-6 mb-2.5">
            {data?.data?.title}
          </h1>
          <Carousel images={data?.data?.images || []} />
          <Info project={data?.data as IProject} />
        </div>
      </section>
      <Video />
      <RelatedProjects />
    </main>
  );
}
