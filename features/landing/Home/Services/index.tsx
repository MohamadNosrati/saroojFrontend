import { getLocale, getTranslations } from "next-intl/server";

import { BreakIcon, HomeCowch, HomeIcon, RullerIcon } from "@/components/icons";
import { servicesDataSelector } from "@/lib/tools/dataSelectors";
import { LocaleEnum } from "@/lib/types/base";

import ServiceItem from "./ServiceItem";

const data = [
  {
    title: "طراحی",
    titleEn: "Design",
    titleAr: "التصميم",
    description:
      "شامل طراحی پلان، نما، دکوراسیون داخلی و فضاهای تجاری با پیشرفته ترین نرم افزار دنیا و تور مجازی پروژه با عینک های واقعیت مجازی (VR)",
    descriptionEn:
      "Including architectural planning, façade design, interior design, and commercial space design using the world's most advanced software, along with immersive virtual project tours through Virtual Reality (VR) headsets.",
    descriptionAr:
      "يشمل تصميم المخططات المعمارية والواجهات والتصميم الداخلي والمساحات التجارية باستخدام أحدث البرامج العالمية، بالإضافة إلى جولات افتراضية غامرة للمشروع باستخدام نظارات الواقع الافتراضي (VR).",
    icon: HomeIcon,
  },
  {
    title: "نظارت",
    titleEn: "Supervision",
    titleAr: "الإشراف",
    description:
      "نظارت بر اجرای پروژه های معماری و عمرانی توسط ناظرین متخصص تا آخرین روز پروژه",
    descriptionEn:
      "Professional supervision of architectural and construction projects by experienced inspectors throughout every stage until project completion.",
    descriptionAr:
      "الإشراف الاحترافي على مشاريع الهندسة المعمارية والإنشاءات من قبل مشرفين متخصصين وذوي خبرة طوال جميع مراحل المشروع وحتى اكتماله.",
    icon: RullerIcon,
  },
  {
    title: "بخش انرژیکال",
    titleEn: "Construction & Execution",
    titleAr: "التنفيذ والإنشاء",
    description:
      "اجرای آپارتمان های نوساز، بازسازی واحد های مسکونی، ویلا سازی و فضاهای تجاری (دفترکار،مغازه و ...)",
    descriptionEn:
      "Construction of newly built apartments, renovation of residential units, villa construction, and execution of commercial spaces such as offices, retail stores, and more.",
    descriptionAr:
      "تنفيذ الشقق السكنية الجديدة، وتجديد الوحدات السكنية، وبناء الفلل، وتنفيذ المساحات التجارية مثل المكاتب والمتاجر وغيرها.",
    icon: HomeCowch,
  },
  {
    title: "طراحی",
    titleEn: "Energy Engineering",
    titleAr: "هندسة الطاقة",
    description:
      "تحلیل و بهینه سازی پروژه های مسکونی، ورزشی، خدماتی و تجاری، با جدیدترین نرم افزار های موجود مانند Design builder و envi_Met با هدف کاهش حداکثری مصرف انرژی و بهره گیری از انرژی های تجدیدپذیر در ساختمان",
    descriptionEn:
      "Analysis and optimization of residential, sports, service, and commercial projects using advanced software such as DesignBuilder and ENVI-met to minimize energy consumption and maximize the use of renewable energy in buildings.",
    descriptionAr:
      "تحليل وتحسين المشاريع السكنية والرياضية والخدمية والتجارية باستخدام أحدث البرامج المتاحة مثل DesignBuilder وENVI-met، بهدف تقليل استهلاك الطاقة إلى الحد الأقصى والاستفادة من مصادر الطاقة المتجددة في المباني.",
    icon: BreakIcon,
  },
];

const Services = async () => {
  const locale = await getLocale();
  const t = await getTranslations("Home.services");
  const items = servicesDataSelector(locale as LocaleEnum, data);

  return (
    <section className="lg:pt-20 md:pt-12 lg:pb-28 md:pb-24 sm:pt-10 sm:pb-20 pt-8 pb-12 bg-gray-darker overflow-hidden">
      {/* TITLE WITH ARCHITECTURAL BALANCED ACCENT */}
      <div className="flex flex-col items-center gap-3 px-4">
        <h5 className="text-center text-white sm:text-4xl text-xl font-black tracking-wide leading-tight max-w-3xl drop-shadow-md">
          {t("title")}
        </h5>
        <span className="w-24 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-2" />
      </div>
      <div className="grid container w-full lg:mt-14 sm:mt-10 mt-6 sm:grid-cols-2 lg:gap-y-12 lg:gap-x-10 md:gap-8 sm:gap-6 gap-6 self-start">
        {items?.map((item, index) => <ServiceItem key={index} item={item} />)}
      </div>
    </section>
  );
};

export default Services;
