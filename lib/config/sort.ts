import { SortByEnum, TOption } from "../types/base";

export const sortOptions: TOption[] = [
  {
    key: SortByEnum.NEWEST,
    label: "جدیدترین",
    labelEn: "newest",
  },
  {
    key: SortByEnum.OLDEST,
    label: "قدیمی ترین",
    labelEn: "oldest",
  },
];
