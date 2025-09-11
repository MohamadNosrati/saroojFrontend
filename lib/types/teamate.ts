import { IFile } from "./file";

export interface ITeamatePayload {
    title:string;
    position:string;
    description:string;
    pictureId:string;
}

export interface ITeamate {
    id:string;
    title:string;
    position:string;
    pictureId:IFile;
    description:string;
    createdAt:Date;
    updateAt:Date;
}
