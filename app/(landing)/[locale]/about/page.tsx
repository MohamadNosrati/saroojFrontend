import { getTranslations } from "next-intl/server";

import AboutUs from "@/features/landing/About/AboutUs";
import Comments from "@/features/landing/About/Comments";
import Contact from "@/features/landing/About/Contact";
import Form from "@/features/landing/About/Form";
import Map from "@/features/landing/About/Map";
import Socials from "@/features/landing/About/Socials";
import { createMetadata } from "@/lib/config/site";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations("About.metadata");

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
        canonical: `${baseUrl}/${locale}/about`,
      },

      openGraph: {
        title: t("openGraphTitle"),
        description: t("openGraphDescription"),
        url: `${baseUrl}/${locale}/about`,
        siteName: t("companyName"),
        locale: locale === "fa" ? "fa_IR" : "en_US",
        type: "profile",
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

const AboutPage = () => {
  return (
    <section>
      <AboutUs />
      <Comments />
      <Contact />
      <Form />
      <Socials />
      <Map />
    </section>
  );
};

export default AboutPage;
