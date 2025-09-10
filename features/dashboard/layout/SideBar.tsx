"use client";

import { dashboardRoutes } from "@/lib/routes/navigationRoutes";
import cn from "@/lib/tools/cn";
import Link from "next/link";

const SideBar = () => {
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
  ];
  return (
    <>
      <aside className="h-full bg-charade-950 rounded-2xl">
        <nav className="select-none rounded-2xl h-full px-6 py-8 flex flex-col gap-y-5 items-center">
          {pages?.map((page) => (
            <div key={page?.href}>
              <Link href={page?.href} className={cn("flex items-center gap-3 text-base font-bold text-wood-smoke-50")}>
                {page?.label}
              </Link>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};
export default SideBar;
