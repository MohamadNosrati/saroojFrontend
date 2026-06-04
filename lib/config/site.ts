import { dashboardRoutes } from "../routes/navigationRoutes";


export const SITE_CONFIG = {
  name: "شرکت ساخت و ساز ساروج",
  domain: process.env.NEXT_PUBLIC_FRONT_URL || "https://saroog-construction.ir",
  locale: "fa_IR",
};

export const createMetadata = (overrides?: any) => ({
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  ...overrides,
});




export const dashboardPages = [
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
  {
    label: "نوتیفیکیشن ها",
    href: dashboardRoutes.notification(),
  },
];