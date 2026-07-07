import { IFile } from "./file";

export interface ITeamatePayload {
  title: string;
  position: string;
  description: string;
  pictureId: string;
  isActive: boolean;
  telegram?: string;
  instagram?: string;
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
  telegram?: string;
  instagram?: string;
}

export interface IUpdateTeamatePayload extends Partial<ITeamatePayload> {
  id: string;
}

export type TTeamateTranslatePayload = Pick<
  ITeamate,
  "alt" | "title" | "description" | "position"
>;

export interface ITranslatedTeamatePayload {
  titleEn?: string;
  descriptionEn?: string;
  altEn?: string;
  positionEn?: string;
}
