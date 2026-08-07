import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/fa/",
        "/en/",
      ],
      disallow: [
        "/dashboard",
        "/signin",
        "/api",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}