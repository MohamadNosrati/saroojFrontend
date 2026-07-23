import { ICategory } from "./categories";
import { IFile } from "./file";

export interface ImageInfo {
  name: string;
  nameEn?: string;
  pictureId: {
    image: string;
    id: string;
  };
}

export interface ImageInfoPayload {
  name: string;
  pictureId: string;
}
export interface ImageEnInfoPayload {
  nameEn: string;
  pictureIdEn: string;
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
export interface ImageEnItemPayload {
  beforeEn: ImageEnInfoPayload;
  afterEn: ImageEnInfoPayload;
  id?: string;
}

export interface IStepItemPayload {
  name: string;
  pictureId: string;
  alt: string;
  description: string;
  isActive: boolean;
  video?: string;
  id?: string;
}

export interface ITranslatedStepItemPayload {
  nameEn: string;
  pictureIdEn: string;
  altEn: string;
  descriptionEn: string;
  isActiveEn: boolean;
  videoEn?: string;
  id?: string;
}

export interface IStep {
  name: string;
  pictureId: IFile;
  alt: string;
  description: string;
  isActive: boolean;
  video?: string;
  nameEn?: string;
  altEn?: string;
  descriptionEn?: string;
  id?: string;
}

export interface IProject {
  id: string;
  title: string;
  titleEn: string;
  categoryId: ICategory;
  pictureId: IFile;
  images: ImageItem[];
  alt: string;
  altEn: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  descriptionEn?: string;
  isActive: boolean;
  artitectureStyle?: string;
  artitectureStyleEn?: string;
  address: string;
  addressEn?: string;
  createdAt: number;
  updatedAt: number;
  video?: string;
  steps: IStep[];
}

export interface IProjectPayload {
  title: string;
  categoryId: string;
  pictureId: string;
  images: ImageItemPayload[];
  steps: IStepItemPayload[];
  alt: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  isActive: boolean;
  artitectureStyle?: string;
  address: string;
  video?: string;
  titleEn?: string;
  altEn?: string;
  descriptionEn?: string;
  artitectureStyleEn?: string;
  addressEn?: string;
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

export type TProjectTranslatePayload = {
  title: string;
  alt: string;
  artitectureStyle?: string;
  description: string;
  address: string;
  images: ImageItemPayload[];
  steps: IStepItemPayload[];
};

export interface ITranslatedProjectPayload {
  titleEn: string;
  imagesEn: ImageEnItemPayload[];
  altEn: string;
  descriptionEn: string;
  videoEn?: string;
  artitectureStyleEn?: string;
  addressEn: string;
  stepsEn: ITranslatedStepItemPayload[];
}
