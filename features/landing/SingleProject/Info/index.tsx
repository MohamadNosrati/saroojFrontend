import { HomeIcon,AreaIcon,EmptyCalendarIcon,BuildingIcon, DescriptionIcon } from "@/components/icons";
import InfoItem from "./InfoItem";



const Info = () => {
  return (
    <section className="lg:pb-32 sm:pb-20 pb-10 lg:mt-14 sm:mt-10 mt-8   grid grid-cols-2 lg:gap-14 sm:gap-10 gap-6">
      <InfoItem item={{
        icon: AreaIcon,
        key: "آدزس",
        value: "fdfsdfsdfsd"
      }} />
      <InfoItem item={{
        icon: EmptyCalendarIcon,
        key: "آدزس",
        value: "fdfsdfsdfsd"
      }} />
      <InfoItem item={{
        icon: BuildingIcon,
        key: "آدزس",
        value: "fdfsdfsdfsd"
      }} />
      <InfoItem item={{
        icon: EmptyCalendarIcon,
        key: "آدزس",
        value: "fdfsdfsdfsd"
      }} />
      <InfoItem item={{
        icon: DescriptionIcon,
        key: "آدزس",
        value: "fdfsdfsdfsd"
      }} />
    </section>
  );
};

export default Info;
