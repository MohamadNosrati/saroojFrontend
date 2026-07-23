import { Metadata } from "next";

import Carousel from "@/features/landing/SingleProject/Carousel";
import Info from "@/features/landing/SingleProject/Info";
import RelatedProjects from "@/features/landing/SingleProject/RelatedProjects";
import Video from "@/features/landing/SingleProject/Video";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import { slugify } from "@/lib/tools/slugify";
import { IBaseResponse } from "@/lib/types/base";
import { IProject, IProjectWithSuggestions } from "@/lib/types/project";
import { createMetadata } from "@/lib/config/site";
import ShareButton from "@/features/landing/layout/ShareButton";
import { uploadUrl } from "@/lib/tools/upload";
import { CustomWhen } from "@/components/ui/CustomWhen";
import StepsContainer from "@/features/landing/SingleProject/Steps";

import notFound from "../../not-found";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const data = await getData<
    IBaseResponse<
      {
        id: string;
        title: string;
      }[]
    >
  >(ProjectsRoute.getAllSlugs());

  const projects = data?.data?.map((item) => ({
    slug: slugify(item?.title),
  }));

  return projects || [];
}

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");

  const data = await getData<IBaseResponse<IProjectWithSuggestions>>(
    ProjectsRoute.findBySlug(decodedSlug),
  );

  const project = data?.data?.project;

  if (!project) {
    return {
      title: "پروژه یافت نشد | شرکت ساخت و ساز ساروج",
      description: "پروژه مورد نظر یافت نشد.",
    };
  }

  return createMetadata({
    title: `${project.title} | پروژه‌های شرکت ساروج`,
    description:
      project.description ||
      `مشاهده پروژه ${project.title} -  توسط شرکت ساخت و ساز ساروج`,
    keywords: `${project.title}, پروژه ${project.address}, ساخت و ساز,`,
    authors: [{ name: "شرکت ساخت و ساز ساروج" }],
    creator: "شرکت ساخت و ساز ساروج",
    publisher: "شرکت ساخت و ساز ساروج",
    robots: "index, follow",
    alternates: {
      canonical: `${baseUrl}/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | پروژه شرکت ساروج`,
      description: project.description,
      url: `${baseUrl}/projects/${slug}`,
      siteName: "شرکت ساخت و ساز ساروج",
      locale: "fa_IR",
      type: "article",
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      authors: ["شرکت ساخت و ساز ساروج"],
      images: [
        {
          url: uploadUrl(project?.pictureId?.image),
          width: 1200,
          height: 630,
          alt: project?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | پروژه شرکت ساروج`,
      description: project.description,
    },
  });
}

export default async function SingleProjectPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");

  const data = await getData<IBaseResponse<IProjectWithSuggestions>>(
    ProjectsRoute.findBySlug(decodedSlug),
  );

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-neutral-50 dark:bg-[#09090b] min-h-screen text-neutral-900 dark:text-neutral-50 overflow-x-hidden antialiased selection:bg-primary selection:text-black transition-colors duration-200">
      <section className="relative sm:py-8 py-4 mb-2.5 bg-gradient-to-b from-primary/5 via-neutral-100/50 to-neutral-50 dark:from-primary/10 dark:via-[#09090b]/40 dark:to-[#09090b]">
        {/* Refined Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="container relative z-10 px-4 mx-auto max-w-6xl">
          {/* Tightened, sharper header layout */}
          <div className="flex items-center justify-between gap-4  dark:border-neutral-800">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl text-neutral-800 dark:text-neutral-100">
              {data?.data?.project?.title}
            </h1>
            <ShareButton
              paylod={{
                text: "",
                title: data?.data?.project?.title || "",
                image: uploadUrl(
                  data?.data?.project?.pictureId?.image as string,
                ),
              }}
            />
          </div>
          <div className="w-full sm:mt-4 mt-2.5 rounded-xl bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800/60 shadow-sm dark:shadow-none px-1 sm:px-2 sm:py-6 py-4">
            {false ? (
              <Carousel images={data?.data?.project?.images || []} />
            ) : (
              <StepsContainer steps={data?.data?.project?.steps || []} />
            )}
          </div>
          <div className="sm:mt-8 mt-4">
            <Info project={data?.data?.project as IProject} />
          </div>
        </div>
      </section>

      <CustomWhen condition={Boolean(data?.data?.project?.video)}>
        <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#060608] py-6">
          <div className="container px-4 mx-auto max-w-6xl">
            <Video video={data?.data?.project?.video as string} />
          </div>
        </div>
      </CustomWhen>

      <div className="border-t border-neutral-200 dark:border-neutral-800 bg-gradient-to-b dark:bg-dark w-full bg-white from-primary/20 via-primary/10 to-transparent lg:pt-12 sm:pt-8 pt-6 lg:pb-16 pb-8">
        <RelatedProjects suggsetions={data?.data?.suggestions || []} />
      </div>
    </main>
  );
}
