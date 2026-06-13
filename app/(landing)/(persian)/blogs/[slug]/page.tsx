import { Metadata } from "next";

import BlogDetails from "@/features/landing/SingleBlog/Details";
import RelatedBlogs from "@/features/landing/SingleBlog/RelatedBlogs";
import { createMetadata } from "@/lib/config/site";
import { blogsRoutes } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import { slugify } from "@/lib/tools/slugify";
import { IBaseResponse } from "@/lib/types/base";
import { IBlog } from "@/lib/types/blog";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const blogs = await getData<
    IBaseResponse<
      {
        id: string;
        title: string;
      }[]
    >
  >(blogsRoutes.getAllSlugs());

  return blogs?.data?.map((item) => ({
    slug: slugify(item?.title),
  }));
}

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");

  const data = await getData<IBaseResponse<IBlog>>(
    blogsRoutes.findBySlug(decodedSlug),
  );

  const post = data?.data;

  if (!post) {
    return {
      title: "مقاله یافت نشد | شرکت ساخت و ساز ساروج",
      description: "مقاله مورد نظر یافت نشد.",
    };
  }

  const excerpt =
    post.description
      ?.replace(/<[^>]*>/g, "")
      .slice(0, 160)
      .trim() + "...";

  return createMetadata({
    title: `${post.title} | مجله ساخت و ساز ساروج`,
    description: excerpt,
    metadataBase: new URL(baseUrl),
    keywords: `${post.title}, ساخت و ساز`,
    authors: [{ name: "شرکت ساخت و ساز ساروج" }],
    creator: "شرکت ساخت و ساز ساروج",
    publisher: "شرکت ساخت و ساز ساروج",
    robots: "index, follow",
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | مجله ساخت و ساز ساروج`,
      description: excerpt,
      url: `${baseUrl}/blog/${slug}`,
      siteName: "شرکت ساخت و ساز ساروج",
      locale: "fa_IR",
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt || post.createdAt,
      authors: ["شرکت ساخت و ساز ساروج"],
      tags: ["شرکت ساخت و ساز ساروج", post?.title],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | مجله ساخت و ساز ساروج`,
      description: excerpt,
    },
  });
}

export default async function SingleBlogPage({ params }: Props) {
  const slug = (await params)?.slug;
  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");

  const data = await getData<IBaseResponse<IBlog>>(
    blogsRoutes.findBySlug(decodedSlug),
  );

  return (
    <main>
      <BlogDetails blog={data?.data as IBlog} />
      <RelatedBlogs />
    </main>
  );
}
