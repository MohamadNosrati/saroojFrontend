import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

import Banner from "@/features/landing/Projects/Banner";
import Container from "@/features/landing/Projects/Container";
import { createMetadata } from "@/lib/config/site";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import { getTranslations } from "next-intl/server";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations("Projects.metadata");

  return createMetadata(
    {
      title: t("title"),
      description: t("description"),
      keywords: t("keywords"),
      authors: [{ name: t("companyName") }],
      creator: t("companyName"),
      publisher: t("companyName"),
      robots: "index, follow",

      alternates: {
        canonical: `${baseUrl}/${locale}/projects`,
      },

      openGraph: {
        title: t("openGraphTitle"),
        description: t("openGraphDescription"),
        url: `${baseUrl}/${locale}/projects`,
        siteName: t("companyName"),
        locale: locale === "fa" ? "fa_IR" : "en_US",
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title: t("twitterTitle"),
        description: t("twitterDescription"),
      },
    },
    t("companyName"),
  );
}

export default async function ProjectsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [ProjectsRoute.getAll()],
    queryFn: ({ pageParam = 1 }) =>
      getData(
        ProjectsRoute.getAll({
          page: pageParam,
          limit: 9,
          asc: false,
          sort: "createdAt",
        }),
      ),
    initialPageParam: 1,
  });

  return (
    <section className="dark:bg-dark bg-white">
      <Banner />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={null}>
          <Container />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
}
