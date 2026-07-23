import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import HomeCarousel from "@/features/landing/Home/Carousel";
import Categories from "@/features/landing/Home/Categories";
import Faqs from "@/features/landing/Home/Faq";
import Services from "@/features/landing/Home/Services";
import Team from "@/features/landing/Home/Team.tsx";
import { createMetadata } from "@/lib/config/site";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations("Home.metadata");

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
        canonical: `${baseUrl}/${locale}`,
      },

      openGraph: {
        url: `${baseUrl}/${locale}`,
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

export default function Home() {
  return (
    <section>
      <HomeCarousel />
      <Categories />
      <Services />
      <Faqs />
      <Team />
    </section>
  );
}
