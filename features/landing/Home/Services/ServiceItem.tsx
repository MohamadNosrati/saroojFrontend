interface IProps {
  item: {
    title: string;
    description: string;
    icon: any;
  };
}

const ServiceItem: React.FC<IProps> = ({ item }) => {
  const Icon = item?.icon;

  return (
    <div className="flex gap-4">
      <div>
        <Icon className="text-primary max-sm:size-7" height={40} width={40} />
      </div>
      <div className="flex flex-col ">
        <span className="leading-11 font-bold sm:text-3xl text-2xl text-white block">
          {item?.title}
        </span>
        <p className="max-sm:text-sm font-medium text-justify text-gray-lighter ">
          {item?.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceItem;
