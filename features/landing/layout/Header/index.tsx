"use client";

import Link from "next/link";

import { persianRoutes } from "@/lib/routes/navigationRoutes";
import {
  AboutPageIcon,
  BlogsIcon,
  HouseIcon,
  ProjectsIcon,
  SaroojIcon,
} from "@/components/icons";

import DeskTopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import SelectLanguage from "./SelectLanguage";
import ToggleTheme from "./ToggleTheme";

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

const Header = () => {
  return (
    <section className="h-20 sticky top-0 w-full z-50 bg-white/70 dark:bg-dark/70 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.04] transition-all duration-300 shadow-[0_2px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      <div className="container h-full mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* LEFT/RIGHT ALIGNMENT: BRAND LOGO & LINKS */}
        <div className="flex items-center xl:gap-20 lg:gap-12 gap-4">
          {/* Mobile nav trigger box */}
          <div className="lg:hidden p-1.5 hover:bg-dark/5 dark:hover:bg-white/5 rounded-xl transition-colors duration-200">
            <MobileNavigation />
          </div>

          {/* Brand logo container */}
          <Link
            className="transition-transform duration-300 hover:scale-[1.02] flex items-center shrink-0"
            href={persianRoutes.homePage()}
          >
            <SaroojIcon className="sm:w-24 h-10 dark:text-white text-gray-900" />
          </Link>

          {/* Desktop Links row wrapper */}
          <div className="hidden lg:block">
            <DeskTopNavigation data={data} />
          </div>
        </div>

        {/* UTILITIES SYSTEM ROW (Language & Theme switches) */}
        <div className="flex items-center xl:gap-8 lg:gap-6 gap-3">
          {/* Framed control panel block for utility buttons */}
          <div className="flex items-center gap-2 sm:gap-3 bg-dark/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 p-1.5 rounded-2xl shadow-inner">
            <div className="hover:bg-white dark:hover:bg-gray-darker rounded-xl transition-all duration-200 shadow-sm">
              <SelectLanguage />
            </div>

            {/* Separator needle accent line */}
            <span className="w-px h-5 bg-dark/10 dark:bg-white/10 block" />

            <div className="hover:bg-white dark:hover:bg-gray-darker rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center p-0.5">
              <ToggleTheme />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
