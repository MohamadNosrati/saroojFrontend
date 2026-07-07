import { IFile } from "./file";

export interface ICategoryPayload {
  title: string;
  description: string;
  pictureId: string;
}

export interface ICategory {
  id: string;
  title: string;
  pictureId: IFile;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  alt: string;
  categoryId: string;
}

export interface UpdateCategoryPayload extends Partial<ICategoryPayload> {
  id: string;
}

export type TCategoryTranslatePayload = Pick<
  ICategory,
  "alt" | "title" | "description"
>;

export interface ITranslatedCategoryPayload {
  titleEn?: string;
  descriptionEn?: string;
  altEn?: string;
}
