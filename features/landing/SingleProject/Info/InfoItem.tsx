import clsx from "clsx";

interface IProps {
  item: {
    key: string;
    icon: any;
    value: string;
  };
}

export default function InfoItem({ item }: IProps) {
  const Icon = item?.icon;
  return (
    <div
      className={clsx([
        "flex items-center sm:gap-3 gap-2",
        item?.key === "آدرس" ? "col-span-2" : "col-span-1",
      ])}
    >
      <Icon className="text-primary sm:size-10 size-6" />
      <span className="dark:text-gray-lighter font-bold sm:text-xl text-base">{` ${item?.key} : ${item.value}`}</span>
    </div>
  );
}
