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
  descriptionEn?: string;
  altEn?: string;

  pictureId: IFile;
  mobilePictureId: IFile;
  description: string;
  createdAt: Date;
  alt: string;
  link?: string;
  linkEn?: string;
  updatedAt: Date;
  isActive: boolean;
}

export interface UpdateSliderPayload extends Partial<ISliderPayload> {
  id: string;
}

export type TSliderTranslatePayload = Pick<
  ISlider,
  "alt" | "title" | "description"
>;

export interface ITranslatedSliderPayload {
  titleEn?: string;
  descriptionEn?: string;
  altEn?: string;
}
