import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

import BlogsLatest from "@/features/landing/Blog/Latest";
import BlogsList from "@/features/landing/Blog/List";
import { createMetadata } from "@/lib/config/site";
import { blogsRoutes } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations("Blogs.metadata");

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
        canonical: `${baseUrl}/${locale}/blog`,
      },

      openGraph: {
        title: t("openGraphTitle"),
        description: t("openGraphDescription"),
        url: `${baseUrl}/${locale}/blog`,
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

export default async function BlogsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [blogsRoutes.getAll()],
    queryFn: ({ pageParam = 1 }) =>
      getData(
        blogsRoutes.getAll({
          page: pageParam,
          limit: 6,
          asc: false,
          sort: "createdAt",
        }),
      ),
    initialPageParam: 1,
  });

  return (
    <main>
      <BlogsLatest />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogsList />
      </HydrationBoundary>
    </main>
  );
}
