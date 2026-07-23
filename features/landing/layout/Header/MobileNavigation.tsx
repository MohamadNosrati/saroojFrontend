"use client";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import { englishRoutes, persianRoutes } from "@/lib/routes/navigationRoutes";
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
    hrefEn: englishRoutes.homePage(),
    label: "خانه",
    labelEn: "Home",
    icon: HouseIcon,
  },
  {
    href: persianRoutes.projectsPage(),
    hrefEn: englishRoutes.projectsPage(),
    label: "پروژه ها",
    labelEn: "Projects",
    icon: ProjectsIcon,
  },
  {
    href: persianRoutes.blogsPage(),
    hrefEn: englishRoutes.blogsPage(),
    label: "مقالات",
    labelEn: "Articles",
    icon: BlogsIcon,
  },
  {
    href: persianRoutes.aboutPage(),
    hrefEn: englishRoutes.aboutPage(),
    label: "درباره ما",
    labelEn: "About Us",
    icon: AboutPageIcon,
  },
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      {/* MENU TOGGLE BUTTON (Simplified and polished) */}
      <Button
        className="min-w-0 p-2.5 rounded-xl bg-dark/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 transition-all duration-300 active:scale-95"
        color="default"
        variant="light"
        onPress={() => setIsOpen((prv) => !prv)}
      >
        {isOpen ? (
          <CloseIcon
            className="dark:text-white text-gray-900 transition-transform duration-300 rotate-90"
            height={22}
            width={22}
          />
        ) : (
          <HamburgerIcon
            className="dark:text-white text-gray-900 transition-transform duration-300"
            height={22}
            width={22}
          />
        )}
      </Button>

      {/* DROP-DOWN MENU DRAWER */}
      <div
        className={clsx([
          "fixed left-0 right-0 top-20 w-full bg-white/95 dark:bg-dark/95 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06] shadow-2xl transition-all duration-300 ease-out z-[60] py-6 px-4 flex flex-col gap-2 rounded-b-3xl",
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible pointer-events-none",
        ])}
      >
        <div className="container mx-auto flex flex-col gap-2">
          {data?.map((item) => {
            const Icon = item?.icon;
            const isActive = (item?.href || item?.hrefEn) === pathname;

            return (
              <Link
                key={item?.href}
                className={clsx([
                  "w-full flex items-center justify-between py-3.5 px-4 rounded-xl font-extrabold text-base transition-all duration-200 group border",
                  isActive
                    ? "bg-primary text-gray-darker border-primary/20 shadow-lg shadow-primary/10"
                    : "text-gray-800 dark:text-gray-200 bg-transparent border-transparent hover:bg-dark/[0.02] dark:hover:bg-white/[0.02] hover:text-primary dark:hover:text-primary",
                ])}
                href={locale === "fa" ? item?.href : item?.hrefEn}
                onClick={() => setIsOpen(false)} // Auto-close drawer on click
              >
                {/* RIGHT ALIGNED CONTENT BLOCK */}
                <div className="flex items-center gap-3">
                  <span
                    className={clsx([
                      "transition-colors duration-200",
                      isActive
                        ? "text-gray-darker"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-primary",
                    ])}
                  >
                    <Icon height={20} width={20} />
                  </span>
                  <span className="tracking-wide">
                    {locale === "fa" ? item?.label : item?.labelEn}
                  </span>
                </div>

                {/* LEFT ALIGNED INDICATOR ACCENT */}
                <div className="flex items-center gap-2">
                  <ArrowIcon
                    className={clsx([
                      "rotate-180 transition-transform duration-300",
                      isActive
                        ? "text-gray-darker"
                        : "text-gray-400 opacity-60 group-hover:translate-x-[-4px] group-hover:text-primary group-hover:opacity-100",
                    ])}
                    height={12}
                    width={16}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* DARK BACKGROUND BACKDROP LAYER */}
      <button
        aria-label="Close menu"
        className={clsx([
          "fixed inset-0 h-screen w-screen top-20 bg-dark/40 backdrop-blur-sm transition-all duration-300 z-50",
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        ])}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
}
