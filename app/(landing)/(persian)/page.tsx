import { Metadata } from "next";

import HomeCarousel from "@/features/landing/Home/Carousel";
import Categories from "@/features/landing/Home/Categories";
import Faqs from "@/features/landing/Home/Faq";
import Services from "@/features/landing/Home/Services";
import Team from "@/features/landing/Home/Team.tsx";
import { createMetadata } from "@/lib/config/site";

const baseUrl =
  process.env.NEXT_PUBLIC_FRONT_URL || "https://default-domain.ir";

export const metadata: Metadata = createMetadata({
  title: "شرکت ساخت و ساز ساروج | پیمانکار ساخت، بازسازی و پروژه‌های صنعتی",
  description:
    "مجری تخصصی ساخت مسکن، بازسازی بناهای فرسوده و پروژه‌های صنعتی در ایران با استانداردهای روز.",
  keywords:
    "ساخت و ساز, پیمانکار ساختمان, بازسازی ساختمان, پروژه صنعتی, شرکت ساختمانی در ایران, ساروج",
  authors: [{ name: "شرکت ساخت و ساز ساروج" }],
  creator: "شرکت ساخت و ساز ساروج",
  publisher: "شرکت ساخت و ساز ساروج",
  robots: "index, follow",
  alternates: {
    canonical: `${baseUrl}`,
  },
  openGraph: {
    url: baseUrl,
    siteName: "شرکت ساخت و ساز ساروج",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "شرکت ساخت و ساز ساروج | پیمانکار ساختمان و صنعتی در ایران",
    description: "ساخت مسکن، بازسازی و پروژه‌های صنعتی با بالاترین کیفیت.",
  },
});

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
