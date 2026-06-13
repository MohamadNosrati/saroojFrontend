import { IFile } from "./file";

export interface ITeamatePayload {
  title: string;
  position: string;
  description: string;
  pictureId: string;
  isActive: boolean;
}

export interface ITeamate {
  id: string;
  title: string;
  position: string;
  pictureId: IFile;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  alt: string;
}

export interface IUpdateTeamatePayload extends Partial<ITeamatePayload> {
  id: string;
}
