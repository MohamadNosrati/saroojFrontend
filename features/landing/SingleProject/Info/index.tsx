import clsx from "clsx";
import { getLocale, getTranslations } from "next-intl/server";

import {
  AreaIcon,
  EmptyCalendarIcon,
  BuildingIcon,
  DescriptionIcon,
  LocationIcon,
} from "@/components/icons";
import { IProject } from "@/lib/types/project";
import { dateConvertor } from "@/lib/tools/dateConvertor";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { LocaleEnum } from "@/lib/types/base";

import InfoItem from "./InfoItem";

interface IProps {
  project: IProject;
}

const Info: React.FC<IProps> = async ({ project }) => {
  const locale = await getLocale();
  const t = await getTranslations("SingleProject.info");
  const itemLang: Record<
    LocaleEnum,
    {
      address: string;
      startDate: string;
      endDate?: string;
      description: string;
      artitectureStyle: string;
    }
  > = {
    fa: {
      address: project?.address,
      startDate: dateConvertor(project?.startDate),
      endDate: dateConvertor(project?.endDate as number),
      description: project?.description,
      artitectureStyle: project?.artitectureStyle || "",
    },
    en: {
      address: project?.addressEn || "",
      startDate: dateConvertor(project?.startDate, true),
      endDate: dateConvertor(project?.endDate as number, true),
      description: project?.descriptionEn || "",
      artitectureStyle: project?.artitectureStyleEn || "",
    },
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl bg-white/50 dark:bg-neutral-900/30 p-2 backdrop-blur-sm shadow-sm dark:shadow-none">
      <CustomWhen condition={Boolean(project?.area)}>
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150">
          <InfoItem
            item={{
              icon: AreaIcon,
              key: t("area"),
              value: String(project?.area),
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen
        condition={Boolean(itemLang[locale as LocaleEnum]?.artitectureStyle)}
      >
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150">
          <InfoItem
            item={{
              icon: BuildingIcon,
              key: t("artitectureStyle"),
              value: itemLang[locale as LocaleEnum]?.artitectureStyle || "",
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen
        condition={Boolean(itemLang[locale as LocaleEnum]?.startDate)}
      >
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150">
          <InfoItem
            item={{
              icon: EmptyCalendarIcon,
              key: t("startDate"),
              value: itemLang[locale as LocaleEnum]?.startDate,
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen condition={Boolean(itemLang[locale as LocaleEnum]?.endDate)}>
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150">
          <InfoItem
            item={{
              icon: DescriptionIcon,
              key: t("endDate"),
              value: itemLang[locale as LocaleEnum]?.endDate || "",
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen condition={Boolean(itemLang[locale as LocaleEnum]?.address)}>
        <div
          className={clsx(
            "gap-2.5 p-2 rounded-lg col-span-full hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150 ",
          )}
        >
          <InfoItem
            item={{
              icon: LocationIcon,
              key: t("address"),
              value: itemLang[locale as LocaleEnum]?.address || "",
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen
        condition={Boolean(itemLang[locale as LocaleEnum]?.description)}
      >
        <div
          className={clsx(
            "gap-2.5 p-2 rounded-lg col-span-full hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150 ",
          )}
        >
          <InfoItem
            item={{
              icon: DescriptionIcon,
              key: t("description"),
              value: itemLang[locale as LocaleEnum]?.description || "",
            }}
          />
        </div>
      </CustomWhen>
    </section>
  );
};

export default Info;
