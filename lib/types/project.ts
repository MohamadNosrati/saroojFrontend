import { ICategory } from "./categories";
import { IFile } from "./file";

export type ImageType = "before" | "after"

export interface IBFImage {
    name: string;
    type: ImageType;
    pictureId: string;
    alt: string;
}

export interface IProject {
    id:string;
    title: string;
    categoryId: ICategory;
    pictureId: IFile;
    images: IBFImage[];
    alt: string;
    area: number;
    startDate: Date;
    endDate?: Date;
    description: string;
    isActive:boolean;
}

export interface IProjectPayload {
    title: string;
    categoryId: string;
    pictureId: string;
    images: IBFImage[];
    alt: string;
    area: number;
    startDate: Date;
    endDate?: Date;
    description: string;
    isActive:boolean;
}

export interface IUpdateProjectPayload extends IProjectPayload {
    id: string;
}