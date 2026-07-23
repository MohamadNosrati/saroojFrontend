import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Carousel from "@/features/landing/SingleProject/Carousel";
import Info from "@/features/landing/SingleProject/Info";
import RelatedProjects from "@/features/landing/SingleProject/RelatedProjects";
import Video from "@/features/landing/SingleProject/Video";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import { slugify } from "@/lib/tools/slugify";
import { IBaseResponse, LocaleEnum } from "@/lib/types/base";
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
        titleEn: string;
      }[]
    >
  >(ProjectsRoute.getAllSlugs());

  const slugs = data?.data?.flatMap((project) => [
    {
      locale: "fa",
      slug: slugify(project?.title),
    },
    {
      locale: "en",
      slug: slugify(project?.titleEn),
    },
  ]);

  return slugs ?? [];
}

type IProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "SingleProject.metadata",
  });

  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");

  const data = await getData<IBaseResponse<IProjectWithSuggestions>>(
    ProjectsRoute.findBySlug(decodedSlug),
  );

  const project = data?.data?.project;

  if (!project) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  const title = locale === "fa" ? project.title : project.titleEn;
  const description =
    locale === "fa" ? project.description : project.descriptionEn;
  const address = locale === "fa" ? project.address : project.addressEn;

  return createMetadata(
    {
      title: `${title} | ${t("projectsSuffix")}`,
      description: description || t("defaultDescription", { title }),
      keywords: `${title}, ${address}, ${t("constructionKeyword")}`,
      authors: [{ name: t("companyName") }],
      creator: t("companyName"),
      publisher: t("companyName"),
      robots: "index, follow",

      alternates: {
        canonical: `${baseUrl}/${locale}/projects/${slug}`,
      },

      openGraph: {
        title: `${title} | ${t("projectSuffix")}`,
        description,
        url: `${baseUrl}/${locale}/projects/${slug}`,
        siteName: t("companyName"),
        locale: locale === "fa" ? "fa_IR" : "en_US",
        type: "article",
        publishedTime: project.createdAt,
        modifiedTime: project.updatedAt,
        authors: [t("companyName")],
        images: [
          {
            url: uploadUrl(project.pictureId.image),
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: `${title} | ${t("projectSuffix")}`,
        description,
      },
    },
    t("companyName"),
  );
}

export default async function SingleProjectPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");
  const locale = await getLocale();
  const condition = locale === "fa" ? "title" : "titleEn";

  const data = await getData<IBaseResponse<IProjectWithSuggestions>>(
    ProjectsRoute.findBySlug(decodedSlug),
  );

  if (!data) {
    notFound();
  }

  const projectData = data?.data?.project;
  const suggestionsData =
    data?.data?.suggestions?.filter((item) => item[condition]) || [];

  const itemLang: Record<
    LocaleEnum,
    {
      title: string;
      alt: string;
      description: string;
    }
  > = {
    fa: {
      title: projectData?.title as string,
      alt: projectData?.alt as string,
      description: projectData?.description as string,
    },
    en: {
      title: projectData?.titleEn as string,
      alt: projectData?.altEn as string,
      description: projectData?.descriptionEn as string,
    },
  };

  return (
    <main className="bg-neutral-50 dark:bg-[#09090b] min-h-screen text-neutral-900 dark:text-neutral-50 overflow-x-hidden antialiased selection:bg-primary selection:text-black transition-colors duration-200">
      <section className="relative sm:py-8 py-4 mb-2.5 bg-gradient-to-b from-primary/5 via-neutral-100/50 to-neutral-50 dark:from-primary/10 dark:via-[#09090b]/40 dark:to-[#09090b]">
        {/* Refined Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="container relative z-10 px-4 mx-auto max-w-6xl">
          {/* Tightened, sharper header layout */}
          <div className="flex items-center justify-between gap-4  dark:border-neutral-800">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl text-neutral-800 dark:text-neutral-100">
              {itemLang[locale as LocaleEnum]?.title}
            </h1>
            <ShareButton
              paylod={{
                text: itemLang[locale as LocaleEnum]?.description || "",
                title: itemLang[locale as LocaleEnum]?.title || "",
                image: uploadUrl(projectData?.pictureId?.image as string),
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
        <RelatedProjects suggsetions={suggestionsData} />
      </div>
    </main>
  );
}
