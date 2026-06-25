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
  pictureId: IFile;
  mobilePictureId: IFile;
  description: string;
  createdAt: Date;
  alt: string;
  link?: string;
  updatedAt: Date;
  isActive: boolean;
}

export interface UpdateSliderPayload extends Partial<ISliderPayload> {
  id: string;
}
