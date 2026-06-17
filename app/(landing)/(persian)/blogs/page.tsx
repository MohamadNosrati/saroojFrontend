import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

import BlogsLatest from "@/features/landing/Blog/Latest";
import BlogsList from "@/features/landing/Blog/List";
import { createMetadata } from "@/lib/config/site";
import { blogsRoutes } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export const metadata: Metadata = createMetadata({
  title: "مجله ساخت و ساز | مقالات و اخبار شرکت ساروج",
  description:
    "مقالات تخصصی ساخت و ساز، نکات بازسازی ساختمان، اخبار پروژه‌های صنعتی و راهنمایی‌های کاربردی برای مالکان و پیمانکاران.",
  keywords:
    "مجله ساخت و ساز, مقاله ساختمانی, اخبار صنعت ساختمان, نکات بازسازی, وبلاگ پیمانکاری, ساخت و ساز در ایران",
  authors: [{ name: "شرکت ساخت و ساز ساروج" }],
  creator: "شرکت ساخت و ساز ساروج",
  publisher: "شرکت ساخت و ساز ساروج",
  robots: "index, follow",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "مجله ساخت و ساز ساروج | مقالات و اخبار",
    description:
      "جدیدترین مقالات تخصصی و اخبار صنعت ساخت و ساز، بازسازی و پروژه‌های صنعتی در ایران.",
    url: `${baseUrl}/blog`,
    siteName: "شرکت ساخت و ساز ساروج",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مجله ساخت و ساز ساروج",
    description: "مقالات تخصصی، نکات کاربردی و اخبار صنعت ساخت و ساز در ایران.",
  },
});

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
