import { Metadata } from "next";

import Banner from "@/features/landing/Projects/Banner";
import Container from "@/features/landing/Projects/Container";
import { createMetadata } from "@/lib/config/site";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export const metadata: Metadata = createMetadata({
  title: "پروژه‌های ساخت و ساز | شرکت ساخت و ساز ساروج",
  description:
    "گالری پروژه‌های موفق شرکت ساروج شامل ساخت مسکن، بازسازی ساختمان‌های فرسوده و پروژه‌های صنعتی در سراسر ایران.",
  keywords:
    "پروژه ساختمانی, نمونه کار ساخت و ساز, پروژه مسکونی, پروژه صنعتی, بازسازی ساختمان, گالری پروژه ساروج",
  authors: [{ name: "شرکت ساخت و ساز ساروج" }],
  creator: "شرکت ساخت و ساز ساروج",
  publisher: "شرکت ساخت و ساز ساروج",
  robots: "index, follow",
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
  openGraph: {
    title: "پروژه‌های ساخت و ساز | شرکت ساروج",
    description:
      "مشاهده پروژه‌های موفق شرکت ساروج در زمینه ساخت مسکن، بازسازی و پروژه‌های صنعتی در ایران.",
    url: `${baseUrl}/projects`,
    siteName: "شرکت ساخت و ساز ساروج",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "پروژه‌های ساخت و ساز | شرکت ساروج",
    description:
      "گالری پروژه‌های موفق ساخت مسکن، بازسازی و صنعتی در سراسر ایران.",
  },
});

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
