import { IFile } from "./file";

type TUserRole = "admin" | "superAdmin";

export interface IUser {
  createdAt: Date;
  email: string;
  id: string;
  password: string;
  role: TUserRole;
  updatedAt: Date;
  userName: string;
  pictureId: IFile;
}

export interface IUserPayload {
  pictureId: string;
}
export interface IUpdateUserPayload extends IUserPayload {
  id: string;
}
