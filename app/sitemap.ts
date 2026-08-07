import { blogsRoutes, ProjectsRoute } from "@/lib/routes/apiRoutes";
import { getData } from "@/lib/services/data";
import { slugify } from "@/lib/tools/slugify";
import { IBaseResponse } from "@/lib/types/base";
import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const locales = ["fa", "en"] as const;

const getStaticPages = (): MetadataRoute.Sitemap => {
  const pages = ["", "/about", "/projects", "/blogs"];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: {
          fa: `${BASE_URL}/fa${page}`,
          en: `${BASE_URL}/en${page}`,
        },
      },
    })),
  );
};

const getProjectsDaynamicPage = async (): Promise<MetadataRoute.Sitemap> => {
  const data = await getData<
    IBaseResponse<
      {
        id: string;
        title: string;
        titleEn: string;
        updatedAt: number;
      }[]
    >
  >(ProjectsRoute.getAllSlugs());

  const projects = data?.data;

  return (
    projects?.flatMap((project) => {
      const faSlug = slugify(project?.title);
      const enSlug = slugify(project?.titleEn);

      return [
        {
          url: `${BASE_URL}/fa/projects/${faSlug}`,
          lastModified: new Date(project.updatedAt),
          priority: 0.8,
          alternates: {
            languages: {
              fa: `${BASE_URL}/fa/projects/${faSlug}`,
              en: `${BASE_URL}/en/projects/${enSlug}`,
            },
          },
        },

        {
          url: `${BASE_URL}/en/projects/${enSlug}`,
          lastModified: new Date(project.updatedAt),
          priority: 0.8,
          alternates: {
            languages: {
              fa: `${BASE_URL}/fa/projects/${faSlug}`,
              en: `${BASE_URL}/en/projects/${enSlug}`,
            },
          },
        },
      ];
    }) || []
  );
};

const getBlogsDaynamicPage = async (): Promise<MetadataRoute.Sitemap> => {
  const data = await getData<
    IBaseResponse<
      {
        id: string;
        title: string;
        titleEn: string;
        updatedAt: number;
      }[]
    >
  >(blogsRoutes.getAllSlugs());

  const blogs = data?.data;

  return (
    blogs?.flatMap((blog) => {
      const faSlug = slugify(blog?.title);
      const enSlug = slugify(blog?.titleEn);

      return [
        {
          url: `${BASE_URL}/fa/blogs/${faSlug}`,
          lastModified: new Date(blog?.updatedAt),
          priority: 0.8,
          alternates: {
            languages: {
              fa: `${BASE_URL}/fa/blogs/${faSlug}`,
              en: `${BASE_URL}/en/blogs/${enSlug}`,
            },
          },
        },

        {
          url: `${BASE_URL}/en/blogs/${enSlug}`,
          lastModified: new Date(blog?.updatedAt),
          priority: 0.8,
          alternates: {
            languages: {
              fa: `${BASE_URL}/fa/blogs/${faSlug}`,
              en: `${BASE_URL}/en/blogs/${enSlug}`,
            },
          },
        },
      ];
    }) || []
  );
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectPages, blogPages] = await Promise.all([
    getProjectsDaynamicPage(),
    getBlogsDaynamicPage(),
  ]);
  return [...getStaticPages(), ...projectPages, ...blogPages];
}
