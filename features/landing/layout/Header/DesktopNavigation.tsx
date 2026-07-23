"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface IProps {
  data: {
    label: string;
    href: string;
    hrefEn: string;
    labelEn: string;
    icon: any;
  }[];
}

export default function DeskTopNavigation({ data }: IProps) {
  const pathName = usePathname();
  const locale = useLocale();

  return (
    <div className="flex max-lg:hidden items-center xl:gap-10 lg:gap-8 gap-6">
      {data?.map((item) => {
        const Icon = item?.icon;
        const isActive = (item?.href || item?.hrefEn) === pathName;

        return (
          <Link
            key={item?.label}
            className={clsx([
              "relative flex items-center gap-2 py-2 text-sm xl:text-base font-extrabold tracking-wide transition-all duration-300 group select-none",
              isActive
                ? "text-primary"
                : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary",
            ])}
            href={locale === "fa" ? item?.href : item?.hrefEn}
          >
            {/* ICON BLOCK WITH MICRO HOVER BOUNCE */}
            <span
              className={clsx([
                "transition-transform duration-300 group-hover:-translate-y-0.5",
                isActive
                  ? "text-primary"
                  : "text-gray-400 dark:text-gray-500 group-hover:text-primary",
              ])}
            >
              <Icon height={18} width={18} />
            </span>

            {/* LINK LABEL TEXT */}
            <span>{locale === "fa" ? item?.label : item?.labelEn}</span>

            {/* ELEGANT UNDERLINE INDICATOR */}
            {/* If active, it stays open. If inactive, it expands beautifully outwards from the center on hover. */}
            <span
              className={clsx([
                "absolute bottom-0 left-0 h-[2px] bg-primary rounded-full transition-all duration-300 origin-center",
                isActive
                  ? "w-full opacity-100 shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
                  : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
              ])}
            />
          </Link>
        );
      })}
    </div>
  );
}
