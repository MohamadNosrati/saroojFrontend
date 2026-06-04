import { IFile } from "./file";

export interface IBlogPayload {
  title: string;
  description: string;
  pictureId: string;
  alt:string;
  isActive:boolean;
}

export interface IBlog {
  id: string;
  title: string;
  pictureId: IFile;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  alt:string;
}

export interface UpdateBlogPayload extends Partial<IBlogPayload> {
  id: string;
} 

export interface IBlogParams {
  page:number;
  limit:number;
  asc:boolean;
  sort:string;
}