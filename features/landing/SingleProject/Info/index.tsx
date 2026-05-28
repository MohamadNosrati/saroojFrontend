import {
  HomeIcon,
  AreaIcon,
  EmptyCalendarIcon,
  BuildingIcon,
  DescriptionIcon,
} from "@/components/icons";
import InfoItem from "./InfoItem";
import { IProject } from "@/lib/types/project";
import { dateConvertor } from "@/lib/tools/dateConvertor";
import { CustomWhen } from "@/components/ui/CustomWhen";

interface IProps {
  project: IProject;
}

const Info: React.FC<IProps> = ({ project }) => {
  return (
    <section className="lg:pb-32 sm:pb-20 pb-10 lg:mt-14 sm:mt-10 mt-8   grid grid-cols-2 lg:gap-14 sm:gap-10 gap-6">
      <CustomWhen condition={Boolean(project?.area)}>
        <InfoItem
          item={{
            icon: AreaIcon,
            key: "مساحت",
            value: String(project?.area),
          }}
        />
      </CustomWhen>
      <CustomWhen condition={Boolean(project?.artitectureStyle)}>
        <InfoItem
          item={{
            icon: BuildingIcon,
            key:"استایل معماری",
            value: project?.artitectureStyle,
          }}
        />
      </CustomWhen>
      <CustomWhen condition={Boolean(project?.startDate)}>
        <InfoItem
          item={{
            icon: EmptyCalendarIcon,
            key: "تاریخ شروع",
            value: dateConvertor(project?.startDate),
          }}
        />
      </CustomWhen>
      <CustomWhen condition={Boolean(project?.endDate)}>
        <InfoItem
          item={{
            icon: DescriptionIcon,
            key: "تاریخ پایان",
            value: dateConvertor(project?.endDate as number),
          }}
        />
      </CustomWhen>
      <CustomWhen condition={Boolean(project?.address)}>
        <InfoItem
          item={{
            icon: DescriptionIcon,
            key: "آدزس",
            value: dateConvertor(project?.endDate as number),
          }}
        />
      </CustomWhen>
    </section>
  );
};

export default Info;
