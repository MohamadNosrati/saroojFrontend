import { dashboardRoutes } from "../routes/navigationRoutes";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
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
];