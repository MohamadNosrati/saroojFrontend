import { ICategory } from "./categories";
import { IFile } from "./file";


export interface ImageInfo {
  name: string;
  pictureId: {
    image:string;
    id:string;
  };
}

export interface ImageInfoPayload {
  name: string;
  pictureId: string;
}



export interface ImageItem {
  before: ImageInfo;
  after: ImageInfo;
  id:string;
}
export interface ImageItemPayload {
  before: ImageInfoPayload;
  after: ImageInfoPayload;
  id?:string;
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
  address:string;
  createdAt:number;
  updatedAt:number;
}

export interface IProjectPayload {
  title: string;
  categoryId: string;
  pictureId: string;
  images: Omit<ImageItemPayload,"id">[];
  alt: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  isActive: boolean;
  artitectureStyle:string;
  address:string;
}

export interface IUpdateProjectPayload extends IProjectPayload {
  id: string;
}


export interface IProjectParams {
  page:number;
  limit:number;
}