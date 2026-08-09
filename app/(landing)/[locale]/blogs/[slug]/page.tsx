import { Metadata } from "next";

import BlogDetails from "@/features/landing/SingleBlog/Details";
import RelatedBlogs from "@/features/landing/SingleBlog/RelatedBlogs";
import { createMetadata } from "@/lib/config/site";
import { blogsRoutes } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import { slugify } from "@/lib/tools/slugify";
import { IBaseResponse, LocaleEnum } from "@/lib/types/base";
import { IBlog, IBlogWithSuggestions } from "@/lib/types/blog";
import { uploadUrl } from "@/lib/tools/upload";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

import { getTranslations } from "next-intl/server";

import { blogDataSelector, langSelector } from "@/lib/tools/dataSelectors";

type IProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const t = await getTranslations("SingleBlog.metadata");

  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");

  const data = await getData<IBaseResponse<IBlogWithSuggestions>>(
    blogsRoutes.findBySlug(decodedSlug),
  );

  const post = data?.data?.blog;

  if (!post) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  const { title, description } = blogDataSelector(locale as LocaleEnum, post);

  const excerpt =
    description
      ?.replace(/<[^>]*>/g, "")
      .slice(0, 160)
      .trim() + "...";

  return createMetadata(
    {
      title: `${title} | ${t("blogTitleSuffix")}`,
      description: excerpt,
      keywords: `${title}, ${t("constructionKeyword")}`,
      authors: [{ name: t("companyName") }],
      creator: t("companyName"),
      publisher: t("companyName"),
      robots: "index, follow",

      alternates: {
        canonical: `${baseUrl}/${locale}/blog/${slug}`,
      },
      openGraph: {
        title: `${title} | ${t("blogTitleSuffix")}`,
        description: excerpt,
        url: `${baseUrl}/${locale}/blog/${slug}`,
        siteName: t("companyName"),
        locale: langSelector(locale as LocaleEnum),
        type: "article",
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt || post.createdAt,
        authors: [t("companyName")],
        tags: [t("companyName"), title],
        images: [
          {
            url: uploadUrl(post.pictureId.image),
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: `${title} | ${t("blogTitleSuffix")}`,
        description: excerpt,
        images: [uploadUrl(post.pictureId.image)],
      },
    },
    t("companyName"),
  );
}
export async function generateStaticParams() {
  const data = await getData<
    IBaseResponse<
      {
        id: string;
        title: string;
        titleEn: string;
      }[]
    >
  >(blogsRoutes.getAllSlugs());
  const slugs = data?.data?.flatMap((blog) => [
    {
      locale: "fa",
      slug: slugify(blog?.title),
    },
    {
      locale: "en",
      slug: slugify(blog?.titleEn),
    },
  ]);

  return slugs ?? [];
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export default async function SingleBlogPage({ params }: Props) {
  const slug = (await params)?.slug;
  const decodedSlug = decodeURIComponent(slug).replaceAll("-", " ");

  const data = await getData<IBaseResponse<IBlogWithSuggestions>>(
    blogsRoutes.findBySlug(decodedSlug),
  );

  return (
    <main>
      <BlogDetails blog={data?.data?.blog as IBlog} />
      <RelatedBlogs suggestions={data?.data?.suggestions || []} />
    </main>
  );
}
