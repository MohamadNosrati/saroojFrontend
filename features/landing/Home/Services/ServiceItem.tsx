import { HomeIcon } from "@/components/icons";

interface IProps {
  item: number;
}

const ServiceItem: React.FC<IProps> = ({ item }) => {
  return (
    <div className="flex gap-10">
      <div>
        <HomeIcon width={40} height={40} className="text-primary" />
      </div>
      <div className="flex flex-col justify-between">
        <span className="leading-11 font-bold text-2xl text-white block">خدمات</span>
        <p className="text-sm font-medium text-gray-lighter ">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و </p>
      </div>
    </div>
  );
};

export default ServiceItem;
