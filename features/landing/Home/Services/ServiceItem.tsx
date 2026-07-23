import { useLocale } from "next-intl";

import { LocaleEnum } from "@/lib/types/base";

interface IProps {
  item: {
    title: string;
    titleEn: string;
    descriptionEn: string;
    description: string;
    icon: any;
  };
}

const ServiceItem: React.FC<IProps> = ({ item }) => {
  const Icon = item?.icon;

  const locale = useLocale();
  const itemLang: Record<
    LocaleEnum,
    {
      title: string;
      description: string;
    }
  > = {
    fa: {
      title: item?.title,
      description: item?.description,
    },
    en: {
      title: item?.titleEn,
      description: item?.descriptionEn,
    },
  };

  return (
    <div className="group flex gap-5 p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.02] border border-transparent hover:border-white/5">
      {/* ICON WITH GLOW CONTAINER */}
      <div className="flex-shrink-0">
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-gray-darker group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] group-hover:scale-110">
          <Icon
            className="max-sm:size-7 transition-colors duration-300"
            height={40}
            width={40}
          />
        </div>
      </div>

      {/* TEXT LAYOUT */}
      <div className="flex flex-col gap-2">
        <span className="font-extrabold sm:text-2xl text-xl text-white block transition-colors duration-300 group-hover:text-primary">
          {itemLang[locale as LocaleEnum]?.title}
        </span>

        {/* Dynamic thin dash accent separator on hover */}
        <span className="w-0 h-[1.5px] bg-primary/40 rounded-full transition-all duration-300 group-hover:w-12" />

        <p className="max-sm:text-sm font-medium text-justify text-gray-lighter/80 leading-relaxed transition-colors duration-300 group-hover:text-white/90">
          {itemLang[locale as LocaleEnum]?.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceItem;
