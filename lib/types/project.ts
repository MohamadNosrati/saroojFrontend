import { ICategory } from "./categories";
import { IFile } from "./file";


export interface ImageInfo {
  name: string;
  pictureId: string;
}



export interface ImageItem {
  before: ImageInfo;
  after: ImageInfo;
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
  artitectureStyle:string;
}

export interface IProjectPayload {
  title: string;
  categoryId: string;
  pictureId: string;
  images: Omit<ImageItem,"id">[];
  alt: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  isActive: boolean;
  artitectureStyle:string;
}

export interface IUpdateProjectPayload extends IProjectPayload {
  id: string;
}
