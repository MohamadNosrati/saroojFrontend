"use client"
import { Button } from "@heroui/button";
import { AboutIcon, ArrowIcon, BlogsIcon, CloseIcon, HamburgerIcon, HouseIcon, ProjectsIcon } from "@/components/icons";
import Link from "next/link";
import { persianRoutes } from "@/lib/routes/navigationRoutes";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const data = [
  {
    href: persianRoutes.homePage(),
    label: "خانه",
    icon: HouseIcon
  },
  {
    href: persianRoutes.projectsPage(),
    label: "پروژه ها",
    icon: ProjectsIcon

  },
  {
    href: persianRoutes.blogsPage(),
    label: "مقالات",
    icon: BlogsIcon

  },
  {
    href: persianRoutes.aboutPage(),
    label: "درباره ما",
    icon: AboutIcon

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
      <Button color="primary" className="min-w-0" onPress={() => setIsOpen(prv => !prv)}>
        {isOpen ? <CloseIcon className="dark:text-white text-dark" width={20} height={20} /> : <HamburgerIcon width={20} height={20} className="dark:text-white text-dark" />}
      </Button>
      <div className={clsx([
        "dark:bg-black w-full transition-all duration-300 container top-20 py-6 gap-6 fixed  right-0 flex-col bg-white h-fit border-t-2 z-10 border-gray ",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      ])}>
        {data?.map((item) => {
          const Icon = item?.icon;
          return (
            <Link className="dark:text-white w-full hover:text-primary hover:dark:text-primary border-3 hover:border-primary border-transparent rounded-2xl transition-colors duration-300 py-1 px-2 flex min-w-fit items-center justify-center gap-2.5 text-black font-bold text-lg" href={item?.href} key={item?.href}>
              <span className="block pb-1">
                <Icon width={24} height={24} />
              </span>
              {item?.label}
              <div>
                <ArrowIcon className="rotate-180" width={20} height={20} />
              </div>
            </Link>
          )
        })}
      </div>
      <button onClick={() => setIsOpen(false)} className={clsx([
        "fixed h-screen top-20 right-0 w-screen z-9  bg-black/50 backdrop-blur-md",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      ])} ></button>
    </div>
  )
}