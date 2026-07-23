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
        "flex items-center gap-2 sm:gap-2.5 w-full bg-neutral-100/40 dark:bg-neutral-800/20 px-2 py-1.5 rounded-lg border border-neutral-200/40 dark:border-neutral-700/20 group hover:border-primary/30 transition-all duration-150",
      ])}
    >
      <div className="flex items-center justify-center p-1.5 rounded-md bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200/60 dark:border-neutral-800 text-primary transition-transform duration-150 group-hover:scale-105 shrink-0">
        <Icon className="sm:size-5 size-4" />
      </div>
      <div className="flex flex-col min-w-0 gap-0.5 select-text">
        <span className="text-[10px] sm:text-xs font-medium tracking-wide text-neutral-400 dark:text-neutral-500 uppercase">
          {item?.key}
        </span>
        <span className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {item.value}
        </span>
      </div>
    </div>
  );
}
