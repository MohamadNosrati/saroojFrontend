import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  icon: any;
  title: string;
}

export default function ContactItem({ children, icon, title }: IProps) {
  const Icon = icon;

  return (
    <div className="group flex flex-col items-center w-full lg:px-12 md:px-6 py-8 max-md:first:pt-0 max-md:last:pb-0 text-center select-none">
      {/* SHARP INDUSTRIAL ICON PLINTH */}
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-darker border border-black/[0.05] dark:border-white/[0.05] text-primary transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30 shadow-sm">
        <Icon height={24} width={24} strokeWidth={1.5} />
      </div>

      {/* METRIC CARD HEADER TITLE */}
      <span className="text-gray-800 dark:text-white text-lg font-extrabold mt-5 mb-2.5 tracking-wide">
        {title}
      </span>

      {/* SLOTTED BODY CHILDREN CONTAINER */}
      <div className="flex flex-col items-center justify-center min-h-[44px]">
        {children}
      </div>
    </div>
  );
}
