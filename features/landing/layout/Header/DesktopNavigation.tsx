"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  data: {
    label: string;
    href: string;
    icon: any;
  }[];
}

export default function DeskTopNavigation({ data }: IProps) {
  const pathName = usePathname();

  return (
    <div className="flex max-lg:hidden items-center gap-12">
      {data?.map((item) => {
        const Icon = item?.icon;
        return (
          <Link
            key={item?.label}
            className={clsx([
              "dark:text-white  flex min-w-fit items-center gap-1 text-black font-bold",
              item?.href === pathName
                ? "bg-primary px-2.5 py-1.5 rounded-lg"
                : "hover:text-primary hover:dark:text-primary transition-all duration-300",
            ])}
            href={item?.href}
          >
            <Icon width={24} height={24} />
            {item?.label}
          </Link>
        );
      })}
    </div>
  );
}
