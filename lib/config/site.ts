import { dashboardRoutes } from "../routes/navigationRoutes";

export const SITE_CONFIG = {
  domain: process.env.NEXT_PUBLIC_FRONT_URL || "https://saroog-construction.ir",
};

export const createMetadata = (
  overrides?: any,
  siteName = "Sarooj Construction Company",
) => {
  return {
    metadataBase: new URL(SITE_CONFIG.domain),

    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },

    ...overrides,
  };
};

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
  {
    label: "چتروم",
    href: dashboardRoutes.chatroom(),
  },
  {
    label: "اعضا",
    href: dashboardRoutes.users(),
  },
  {
    label: "تصاویر",
    href: dashboardRoutes.uploads(),
  },
];

export const locales = ["en", "fa"] as const;
