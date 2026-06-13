import { IUser } from "./user";

export interface ISinginPayload {
    email:string;
    password:string;
}

export interface ISigninRes {
    user:IUser;
    token:string
}


export interface IAuthStore {
  user?: IUser;
  setUser: (user?: IUser) => void;
  clearUser: () => void;
}