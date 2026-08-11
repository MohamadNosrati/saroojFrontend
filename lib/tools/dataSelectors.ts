import { INavItem } from "@/features/landing/layout/Header";

import { LocaleEnum, SortByEnum, TOption } from "../types/base";
import { IBlog } from "../types/blog";
import { IProject } from "../types/project";

export const faqDataSelector = (locale: LocaleEnum, data: any[]) => {
  switch (locale) {
    case "fa":
      return data?.map((item) => ({
        question: item?.question,
        answer: item?.answer,
      }));
    case "en":
      return data?.map((item) => ({
        question: item?.questionEn,
        answer: item?.answerEn,
      }));
    case "ar":
      return data?.map((item) => ({
        question: item?.questionAr,
        answer: item?.answerAr,
      }));
    default:
      return data;
  }
};

export const servicesDataSelector = (locale: LocaleEnum, data: any[]) => {
  switch (locale) {
    case "fa":
      return data?.map((item) => ({
        title: item?.title,
        description: item?.description,
        icon: item?.icon,
      }));
    case "en":
      return data?.map((item) => ({
        title: item?.titleEn,
        description: item?.descriptionEn,
        icon: item?.icon,
      }));
    case "ar":
      return data?.map((item) => ({
        title: item?.titleAr,
        description: item?.descriptionAr,
        icon: item?.icon,
      }));
    default:
      return data;
  }
};

export const projectDataSelector = (
  locale: LocaleEnum,
  project: IProject,
): Pick<IProject, "title" | "description" | "address"> => {
  switch (locale) {
    case "fa":
      return {
        title: project?.title,
        description: project?.description,
        address: project?.address,
      };
    case "en":
      return {
        title: project?.titleEn || "",
        description: project?.descriptionEn || "",
        address: project?.addressEn || "",
      };
    case "ar":
      return {
        title: project?.titleAr || "",
        description: project?.descriptionAr || "",
        address: project?.addressAr || "",
      };
    default:
      return project;
  }
};

export const blogDataSelector = (
  locale: LocaleEnum,
  blog: IBlog,
): Pick<IBlog, "title" | "description"> => {
  switch (locale) {
    case "fa":
      return {
        title: blog?.title,
        description: blog?.description,
      };
    case "en":
      return {
        title: blog?.titleEn || "",
        description: blog?.descriptionEn || "",
      };
    case "ar":
      return {
        title: blog?.titleAr || "",
        description: blog?.descriptionAr || "",
      };
    default:
      return blog;
  }
};

export const navDataSelector = (
  locale: LocaleEnum,
  data: INavItem[],
): Pick<INavItem, "label" | "href" | "icon">[] => {
  switch (locale) {
    case "fa":
      return data?.map((item) => ({
        label: item?.label,
        href: item?.href,
        icon: item?.icon,
      }));
    case "en":
      return data?.map((item) => ({
        label: item?.labelEn,
        href: item?.hrefEn,
        icon: item?.icon,
      }));
    case "ar":
      return data?.map((item) => ({
        label: item?.labelAr,
        href: item?.hrefAr,
        icon: item?.icon,
      }));
    default:
      return data;
  }
};

export const sortingDataSelector = (
  locale: LocaleEnum,
  data: TOption[],
): {
  label: string;
  key: SortByEnum;
}[] => {
  switch (locale) {
    case "fa":
      return data?.map((item) => ({
        key: item?.key,
        label: item?.label,
      }));
    case "en":
      return data?.map((item) => ({
        key: item?.key,
        label: item?.labelEn || "",
      }));
    case "ar":
      return data?.map((item) => ({
        key: item?.key,
        label: item?.labelAr || "",
      }));
    default:
      return data;
  }
};

export const langSelector = (locale: LocaleEnum) => {
  switch (locale) {
    case "fa":
      return "fa_IR";
    case "en":
      return "en_US";
    case "ar":
      return "ar_SA";
    default:
      return "fa_IR";
  }
};
export const dateTimeSelector = (locale: LocaleEnum) => {
  switch (locale) {
    case "fa":
      return "fa-IR-u-ca-persian";

    case "en":
      return "en-US-u-ca-gregory";

    case "ar":
      return "ar-SA-u-ca-islamic";

    default:
      return "fa-IR-u-ca-persian";
  }
};

export const languageSelector = (locale: LocaleEnum) => {
  switch (locale) {
    case "fa":
      return "persian";
    case "en":
      return "english";
    case "ar":
      return "arabic";
    default:
      return "persian";
  }
};
export const dirSelector = (locale: LocaleEnum): "rtl" | "ltr" => {
  switch (locale) {
    case "fa":
      return "rtl";
    case "en":
      return "ltr";
    case "ar":
      return "rtl";
    default:
      return "rtl";
  }
};

export const titleSelector = (
  locale: LocaleEnum,
): "title" | "titleEn" | "titleAr" => {
  switch (locale) {
    case "fa":
      return "title";
    case "en":
      return "titleEn";
    case "ar":
      return "titleAr";
    default:
      return "title";
  }
};
