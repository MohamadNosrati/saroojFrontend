import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";

import { InstagramIcon, TelegramIcon } from "@/components/icons";
import { ITeamate } from "@/lib/types/teamate";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { uploadUrl } from "@/lib/tools/upload";
import { LocaleEnum } from "@/lib/types/base";

interface IProps {
  item: ITeamate;
}

const TeamItem: React.FC<IProps> = async ({ item }) => {
  const locale = await getLocale();
  const itemLang: Record<
    LocaleEnum,
    {
      title: string;
      alt: string;
      position: string;
      description: string;
    }
  > = {
    fa: {
      title: item?.title,
      alt: item?.alt,
      description: item?.description,
      position: item?.position,
    },
    en: {
      title: item?.titleEn,
      alt: item?.altEn,
      description: item?.descriptionEn,
      position: item?.positionEn,
    },
  };

  return (
    <div className="lg:col-span-4 sm:col-span-6 col-span-12 flex flex-col items-center group bg-gray-50/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 py-6 px-1 rounded-3xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-darker shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-black/40 hover:-translate-y-1">
      {/* AVATAR WRAPPER WITH DOUBLE RING GLOW */}
      <div className="relative p-1.5 rounded-full border-2 border-dashed border-primary/30 group-hover:border-primary transition-colors duration-500">
        <div className="overflow-hidden rounded-full aspect-square sm:w-40 sm:h-40 size-24 relative shadow-md">
          <Image
            alt={itemLang[locale as LocaleEnum]?.alt || ""}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            height={160}
            src={uploadUrl(item?.pictureId?.image)}
            width={160}
          />
        </div>
      </div>

      {/* MEMBER NAME */}
      <span className="block mt-6 text-center text-2xl text-gray-800 dark:text-white font-extrabold tracking-wide transition-colors duration-300 group-hover:text-primary">
        {itemLang[locale as LocaleEnum]?.title}
      </span>

      {/* MEMBER POSITION */}
      <span className="mt-1.5 block text-center font-bold text-base text-primary/90 bg-primary/10 px-3 py-0.5 rounded-full border border-primary/20">
        {itemLang[locale as LocaleEnum]?.position}
      </span>

      {/* MEMBER BIO / DESCRIPTION */}
      <p className="text-sm text-justify text-gray-500 dark:text-gray-lighter/80 font-medium mt-4 leading-relaxed max-w-[90%]">
        {itemLang[locale as LocaleEnum]?.description}
      </p>
      <div className="flex mt-6 gap-3 grow items-end">
        <CustomWhen condition={Boolean(item?.instagram)}>
          <Link
            className="bg-dark/5 dark:bg-white/5 hover:bg-primary dark:hover:bg-primary border border-black/5 dark:border-white/10 rounded-xl flex items-center justify-center size-10 shadow-sm transition-all duration-300 hover:shadow-[0_4px_12px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-0.5 group/btn"
            href={item?.instagram || ""}
          >
            <InstagramIcon
              className="text-gray-600 dark:text-gray-300 group-hover/btn:text-gray-darker transition-colors duration-300"
              height={20}
              width={20}
            />
          </Link>
        </CustomWhen>
        <CustomWhen condition={Boolean(item?.telegram)}>
          <Link
            className="bg-dark/5 dark:bg-white/5 hover:bg-primary dark:hover:bg-primary border border-black/5 dark:border-white/10 rounded-xl flex items-center justify-center size-10 shadow-sm transition-all duration-300 hover:shadow-[0_4px_12px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-0.5 group/btn"
            href={item?.telegram || ""}
          >
            <TelegramIcon
              className="text-gray-600 dark:text-gray-300 group-hover/btn:text-gray-darker transition-colors duration-300"
              height={20}
              width={20}
            />
          </Link>
        </CustomWhen>
      </div>
    </div>
  );
};

export default TeamItem;
