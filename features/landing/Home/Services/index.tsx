import Image from "next/image";

import ServiceItem from "./ServiceItem";

import ServiceImage from "@/public/images/serviceImage.png";
import { BreakIcon, HomeCowch, HomeIcon, RullerIcon } from "@/components/icons";

const data = [
  {
    title: "طراحی",
    description:
      "شامل طراحی پلان، نما، دکوراسیون داخلی و فضاهای تجاری با پیشرفته ترین نرم افزار دنیا و تور مجازی پروژه با عینک های واقعیت مجازی (VR)",
    icon: HomeIcon,
  },
  {
    title: "نظارت",
    description:
      "نظارت بر اجرای پروژه های معماری و عمرانی توسط ناظرین متخصص تا آخرین روز پروژه",
    icon: RullerIcon,
  },
  {
    title: "بخش انرژیکال",
    description:
      "اجرای آپارتمان های نوساز، بازسازی واحد های مسکونی، ویلا سازی و فضاهای تجاری (دفترکار،مغازه و ...)",
    icon: HomeCowch,
  },
  {
    title: "طراحی",
    description:
      "تحلیل و بهینه سازی پروژه های مسکونی، ورزشی، خدماتی و تجاری، با جدیدترین نرم افزار های موجود مانند Design builder و envi_Met با هدف کاهش حداکثری مصرف انرژی و بهره گیری از انرژی های تجدیدپذیر در ساختمان",
    icon: BreakIcon,
  },
];

const Services = () => {
  return (
    <section className="lg:pt-20 md:pt-12 lg:pb-32 md:pb-24 sm:pt-10 sm:pb-20 pt-8 pb-12 bg-gray-darker overflow-hidden">
      {/* TITLE WITH ARCHITECTURAL BALANCED ACCENT */}
      <div className="flex flex-col items-center gap-3 px-4">
        <h5 className="text-center text-white sm:text-4xl text-2xl font-black tracking-wide leading-tight max-w-3xl drop-shadow-md">
          در شرکت معماری ساروج چه خدماتی عرضه می شود؟
        </h5>
        <span className="w-24 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-2" />
      </div>

      <div className="container max-lg:flex-col lg:mt-16 sm:mt-10 mt-6 flex gap-x-12 px-4 items-center">
        {/* FEATURE IMAGE WITH NEW MODERN FRAME CUT */}
        <div className="basis-1/3 max-lg:hidden aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 group">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-darker via-transparent to-transparent z-10 opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
          <Image
            fill
            alt="Sarooj Architecture Services"
            src={ServiceImage}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div className="basis-2/3 grid sm:grid-cols-2 lg:gap-y-12 lg:gap-x-10 md:gap-8 sm:gap-6 gap-6 self-start">
          {data?.map((item, index) => <ServiceItem key={index} item={item} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;
