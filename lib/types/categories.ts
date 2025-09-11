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
}
