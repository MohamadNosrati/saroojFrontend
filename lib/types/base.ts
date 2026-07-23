export interface IBaseResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export interface IPaginatedResponse<T> {
  result: T[];
  totalCount: number;
  totalPages: number;
}

export interface ISocketAcknowledgement<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export enum SortByEnum {
  NEWEST = "newest",
  OLDEST = "oldest",
}

export type TOption = {
  label: string;
  key: SortByEnum;
  labelEn?: string;
};

export type LocaleParams = Promise<{ locale: "en" | "fa" }>;

export enum LocaleEnum {
  FA = "fa",
  En = "en",
}
