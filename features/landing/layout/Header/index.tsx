"use client";

import Link from "next/link";

import DeskTopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import SelectLanguage from "./SelectLanguage";
import ToggleTheme from "./ToggleTheme";

import { persianRoutes } from "@/lib/routes/navigationRoutes";
import {
  AboutPageIcon,
  BlogsIcon,
  HouseIcon,
  ProjectsIcon,
  SaroojIcon,
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

const Header = () => {
  return (
    <section className="h-20 sticky bg-white dark:bg-dark bg-opacity-20 backdrop-blur-sm  w-full top-0 z-[10] flex items-center">
      <div className="container flex items-center justify-between">
        <div className="flex items-center  xl:gap-24 lg:gap-12 gap-6">
          <MobileNavigation />
          <Link href={persianRoutes.homePage()}>
            <SaroojIcon className="sm:w-24 h-12 dark:text-white" />
          </Link>
          <DeskTopNavigation data={data} />
        </div>
        <div className="flex items-center xl:gap-16 lg:gap-12 gap-6">
          <SelectLanguage />
          <ToggleTheme />
        </div>
      </div>
    </section>
  );
};

export default Header;
