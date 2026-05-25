import { ICategory } from "./categories";
import { IFile } from "./file";

export enum ImageType {
  BEFORE = "before",
  AFTER = "after",
}

export interface ImageInfo {
  name: string;
  pictureId: string;
  alt: string;
}

export interface IBeforeImage extends ImageInfo {
  type: ImageType.BEFORE;
}
export interface IAfterImage extends ImageInfo {
  type: ImageType.AFTER;
}

export interface ImageItem {
  before: IBeforeImage;
  after: IAfterImage;
  id:string;
}

export interface IProject {
  id: string;
  title: string;
  categoryId: ICategory;
  pictureId: IFile;
  images: ImageItem[];
  alt: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  isActive: boolean;
}

export interface IProjectPayload {
  title: string;
  categoryId: string;
  pictureId: string;
  images: ImageItem[];
  alt: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  isActive: boolean;
}

export interface IUpdateProjectPayload extends IProjectPayload {
  id: string;
}
