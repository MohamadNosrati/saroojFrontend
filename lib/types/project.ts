import { ICategory } from "./categories";
import { IFile } from "./file";

export interface ImageInfo {
  name: string;
  pictureId: {
    image: string;
    id: string;
  };
}

export interface ImageInfoPayload {
  name: string;
  pictureId: string;
}

export interface ImageItem {
  before: ImageInfo;
  after: ImageInfo;
  id: string;
}
export interface ImageItemPayload {
  before: ImageInfoPayload;
  after: ImageInfoPayload;
  id?: string;
}
export interface IStePItemPayload {
  name: string;
  pictureId: string;
  alt: string;
  description: string;
  isActive: "0" | "1";
  video?: string;
  id?: string;
}

export interface IStep {
  name: string;
  pictureId: IFile;
  alt: string;
  description: string;
  isActive: boolean;
  video?: string;
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
  artitectureStyle?: string;
  address: string;
  createdAt: number;
  updatedAt: number;
  video?: string;
  steps: IStep[];
}

export interface IProjectPayload {
  title: string;
  categoryId: string;
  pictureId: string;
  images: Omit<ImageItemPayload, "id">[];
  alt: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  isActive: boolean;
  artitectureStyle?: string;
  address: string;
  video?: string;
}

export interface IUpdateProjectPayload extends IProjectPayload {
  id: string;
}

export interface IProjectParams {
  page: number;
  limit: number;
  asc?: boolean;
  sort?: string;
}

export interface IProjectWithSuggestions {
  project: IProject;
  suggestions: IProject[];
}

export enum IProjectType {
  Steps = "steps",
  BeforeAfter = "beforeAfter",
}
