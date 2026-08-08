import { IFile } from "./file";

export interface IBlogPayload {
  title: string;
  description: string;
  pictureId: string;
  alt: string;
  isActive: boolean;
}

export interface IBlog {
  id: string;
  title: string;
  titleEn: string;
  titleAr: string;
  pictureId: IFile;
  description: string;
  createdAt: Date;
  descriptionEn: string;
  descriptionAr: string;
  updatedAt: Date;
  isActive: boolean;
  alt: string;
  altEn: string;
  altAr: string;
  userId: {
    userName: string;
    id: string;
    pictureId: IFile;
  };
}

export interface ITranslatedBlogPayload {
  titleEn?: string;
  descriptionEn?: string;
  altEn?: string;
  titleAr?: string;
  descriptionAr?: string;
  altAr?: string;
}
export interface UpdateBlogPayload extends Partial<IBlogPayload> {
  id: string;
}

export interface IBlogParams {
  page: number;
  limit: number;
  asc: boolean;
  sort: string;
}

export interface IBlogWithSuggestions {
  blog: IBlog;
  suggestions: IBlog[];
}

export type TBlogTranslatePayload = Pick<
  IBlog,
  "alt" | "title" | "description"
>;


