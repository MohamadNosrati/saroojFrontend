

import { dashboardRoutes } from "@/lib/routes/navigationRoutes";
import cn from "@/lib/tools/cn";
import Link from "next/link";

const pages = [
  {
    label: "اعضای تیم",
    href: dashboardRoutes.teamates(),
  },
  {
    label: "پروژه ها",
    href: dashboardRoutes.projects(),
  },
  {
    label: "دسته بندی ها",
    href: dashboardRoutes.categories(),
  },
  {
    label: "داشبورد",
    href: dashboardRoutes.dashboard(),
  },
  {
    label: "نظرات",
    href: dashboardRoutes.comments(),
  },
  {
    label: "اسلایدر ها",
    href: dashboardRoutes.sliders(),
  },
  {
    label: "مقالات",
    href: dashboardRoutes.blogs(),
  },
];

const SideBar = () => {
  return (
    <div className="border-2 min-h-full border-primary rounded-2xl">
      <nav className="select-none rounded-2xl h-full p-6 flex flex-col gap-y-5">
        {pages?.map((page) => (
          <div key={page?.href}>
            <Link href={page?.href} className={cn("flex items-center font-bold gap-3 text-base text-white")}>
              {page?.label}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};
export default SideBar;
