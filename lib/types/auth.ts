import { IUser } from "./user";

export interface ISinginPayload {
    email:string;
    password:string;
}

export interface ISigninRes {
    user:IUser;
    token:string
}