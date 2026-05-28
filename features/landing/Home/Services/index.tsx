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
    <section className="lg:pt-20 md:pt-12 lg:pb-32 md:pb-24 sm:pt-10 sm:pb-20 pt-8 pb-12 bg-gray-darker">
      <h5 className="text-center text-white sm:text-4xl text-xl font-bold">
        در شرکت معماری ساروج چه خدماتی عرضه می شود؟
      </h5>
      <div className="container max-lg:flex-col lg:mt-12 sm:mt-8 mt-4 flex gap-x-12">
        <div className="basis-1/3 max-lg:hidden aspect-square relative">
          <Image alt="" fill src={ServiceImage} />
        </div>
        <div className="basis-2/3 grid sm:grid-cols-2 lg:gap-14 md:gap-10 sm:gap-8 gap-6">
          {data?.map((item, index) => <ServiceItem item={item} key={index} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;
