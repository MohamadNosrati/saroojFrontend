import { LocaleEnum } from "../types/base";

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
