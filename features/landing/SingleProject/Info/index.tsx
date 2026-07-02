import clsx from "clsx";

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

import InfoItem from "./InfoItem";

interface IProps {
  project: IProject;
}

const Info: React.FC<IProps> = ({ project }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl bg-white/50 dark:bg-neutral-900/30 p-2 backdrop-blur-sm shadow-sm dark:shadow-none">
      <CustomWhen condition={Boolean(project?.area)}>
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150">
          <InfoItem
            item={{
              icon: AreaIcon,
              key: "مساحت",
              value: String(project?.area),
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen condition={Boolean(project?.artitectureStyle)}>
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150">
          <InfoItem
            item={{
              icon: BuildingIcon,
              key: "استایل معماری",
              value: project?.artitectureStyle || "",
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen condition={Boolean(project?.startDate)}>
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150">
          <InfoItem
            item={{
              icon: EmptyCalendarIcon,
              key: "تاریخ شروع",
              value: dateConvertor(project?.startDate),
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen condition={Boolean(project?.endDate)}>
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150">
          <InfoItem
            item={{
              icon: DescriptionIcon,
              key: "تاریخ پایان",
              value: dateConvertor(project?.endDate as number),
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen condition={Boolean(project?.address)}>
        <div
          className={clsx(
            "gap-2.5 p-2 rounded-lg hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150 ",
          )}
        >
          <InfoItem
            item={{
              icon: LocationIcon,
              key: "آدرس",
              value: project?.address || "",
            }}
          />
        </div>
      </CustomWhen>
      <CustomWhen condition={Boolean(project?.description)}>
        <div
          className={clsx(
            "gap-2.5 p-2 rounded-lg col-span-full hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors duration-150 ",
          )}
        >
          <InfoItem
            item={{
              icon: DescriptionIcon,
              key: "توضیحات",
              value: project?.description || "",
            }}
          />
        </div>
      </CustomWhen>
    </section>
  );
};

export default Info;
