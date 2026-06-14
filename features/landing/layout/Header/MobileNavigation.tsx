"use client";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { persianRoutes } from "@/lib/routes/navigationRoutes";
import {
  AboutPageIcon,
  ArrowIcon,
  BlogsIcon,
  CloseIcon,
  HamburgerIcon,
  HouseIcon,
  ProjectsIcon,
} from "@/components/icons";

const data = [
  {
    href: persianRoutes.homePage(),
    label: "خانه",
    icon: HouseIcon,
  },
  {
    href: persianRoutes.projectsPage(),
    label: "پروژه ها",
    icon: ProjectsIcon,
  },
  {
    href: persianRoutes.blogsPage(),
    label: "مقالات",
    icon: BlogsIcon,
  },
  {
    href: persianRoutes.aboutPage(),
    label: "درباره ما",
    icon: AboutPageIcon,
  },
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <Button
        className="min-w-0"
        color="primary"
        onPress={() => setIsOpen((prv) => !prv)}
      >
        {isOpen ? (
          <CloseIcon
            className="dark:text-white text-dark"
            height={20}
            width={20}
          />
        ) : (
          <HamburgerIcon
            className="dark:text-white text-dark"
            height={20}
            width={20}
          />
        )}
      </Button>
      <div
        className={clsx([
          "dark:bg-black w-full transition-all duration-300 container top-20 py-6 gap-2.5 fixed flex  right-0 flex-col bg-white h-fit border-t-2 z-10 border-gray ",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        ])}
      >
        {data?.map((item) => {
          const Icon = item?.icon;

          return (
            <Link
              key={item?.href}
              className={clsx([
                "dark:text-white  border-transparent rounded-2xl transition-all duration-300 py-1 px-2 flex min-w-fit items-center w-full justify-center gap-2.5 text-black font-bold text-lg",
                item?.href === pathname
                  ? "bg-primary"
                  : "hover:text-primary hover:dark:text-primary border-3 hover:border-primary",
              ])}
              href={item?.href}
            >
              <div className="flex items-center gap-1 w-24">
                <span className="block pb-1">
                  <Icon height={20} width={20} />
                </span>
                {item?.label}
              </div>
              <div className="pb-1">
                <ArrowIcon className="rotate-180" height={12} width={16} />
              </div>
            </Link>
          );
        })}
      </div>
      <button
        className={clsx([
          "fixed h-screen top-20 right-0 w-screen z-9  bg-black/50 backdrop-blur-md",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        ])}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
}
