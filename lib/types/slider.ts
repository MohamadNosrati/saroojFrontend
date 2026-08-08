import { IFile } from "./file";

export interface ISliderPayload {
  title: string;
  alt: string;
  link?: string;
  description: string;
  pictureId: string;
  isActive: boolean;
}

export interface ISlider {
  id: string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  altEn?: string;
  altAr?: string;
  pictureId: IFile;
  mobilePictureId: IFile;
  description: string;
  createdAt: Date;
  alt: string;
  link?: string;
  linkEn?: string;
  linkAr?: string;
  updatedAt: Date;
  isActive: boolean;
}

export interface ITranslatedSliderPayload {
  titleEn?: string;
  descriptionEn?: string;
  altEn?: string;
  titleAr?: string;
  descriptionAr?: string;
  altAr?: string;
}


export interface UpdateSliderPayload extends Partial<ISliderPayload> {
  id: string;
}

export type TSliderTranslatePayload = Pick<
  ISlider,
  "alt" | "title" | "description"
>;

