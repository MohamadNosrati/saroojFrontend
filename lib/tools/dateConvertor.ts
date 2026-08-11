import { LocaleEnum } from "../types/base";

import { dateTimeSelector } from "./dataSelectors";

export const dateConvertor = (
  timestamp: number | string | Date,
  language: LocaleEnum = LocaleEnum.FA,
) => {
  return new Intl.DateTimeFormat(dateTimeSelector(language), {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
};

export const timeConvertor = (timestamp: number | string | Date) => {
  return new Date(timestamp).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const toPersianReadable = (gregorianDateStr: string) => {
  const date = new Date(gregorianDateStr);

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })?.format(date);
};
