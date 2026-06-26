import { Metadata } from "next";

import AboutUs from "@/features/landing/About/AboutUs";
import Comments from "@/features/landing/About/Comments";
import Contact from "@/features/landing/About/Contact";
import Form from "@/features/landing/About/Form";
import Map from "@/features/landing/About/Map";
import Socials from "@/features/landing/About/Socials";
import { createMetadata } from "@/lib/config/site";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export const metadata: Metadata = createMetadata({
  title: "درباره ما | شرکت ساخت و ساز ساروج",
  description:
    "آشنایی با شرکت ساخت و ساز ساروج، سابقه، افتخارات، تیم متخصص و رویکرد ما در اجرای پروژه‌های مسکونی، بازسازی و صنعتی در ایران.",
  keywords:
    "درباره شرکت ساختمانی, سابقه شرکت ساروج, تیم ساخت و ساز, افتخارات ساختمانی, شرکت پیمانکاری در ایران",
  authors: [{ name: "شرکت ساخت و ساز ساروج" }],
  creator: "شرکت ساخت و ساز ساروج",
  publisher: "شرکت ساخت و ساز ساروج",
  robots: "index, follow",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "درباره شرکت ساخت و ساز ساروج | سابقه و افتخارات",
    description:
      "با بیش از ۲۰ سال تجربه در زمینه ساخت مسکن، بازسازی و پروژه‌های صنعتی در ایران.",
    url: `${baseUrl}/about`,
    siteName: "شرکت ساخت و ساز ساروج",
    locale: "fa_IR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "درباره ما | شرکت ساخت و ساز ساروج",
    description:
      "آشنایی با تیم متخصص، سابقه و افتخارات شرکت ساروج در صنعت ساخت و ساز ایران.",
  },
});

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
