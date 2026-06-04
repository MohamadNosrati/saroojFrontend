import Carousel from "@/features/landing/SingleProject/Carousel";
import Info from "@/features/landing/SingleProject/Info";
import RelatedProjects from "@/features/landing/SingleProject/RelatedProjects";
import Video from "@/features/landing/SingleProject/Video";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import { slugify } from "@/lib/tools/slugify";
import { IBaseResponse } from "@/lib/types/base";
import { IProject } from "@/lib/types/project";
import notFound from "../../not-found";
import { Metadata } from "next";
import { createMetadata } from "@/lib/config/site";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const projects = await getData<
    IBaseResponse<
      {
        id: string;
        title: string;
      }[]
    >
  >(ProjectsRoute.getAllSlugs());
  return projects?.data?.map((item) => ({
    slug: slugify(item?.title),
  }));
}

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");

  const data = await getData<IBaseResponse<IProject>>(
    ProjectsRoute.findBySlug(decodedSlug),
  );

  const project = data?.data;

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
    metadataBase: new URL(baseUrl),
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

  const data = await getData<IBaseResponse<IProject>>(
    ProjectsRoute.findBySlug(decodedSlug),
  );

  if (!data) {
    notFound();
  }

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
