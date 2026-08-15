import { inter } from "../config/fonts";
import { IUser } from "./user";

export interface ISinginPayload {
  email: string;
  password: string;
  provider?:AuthIdentityProvider
}

export interface ISigninRes {
  user: IUser;
  token: string;
}

export interface IAuthStore {
  user?: IUser;
  setUser: (user?: IUser) => void;
  clearUser: () => void;
}

export enum AuthIdentityProvider {
  GOOGLE = "google",
  FACEBOOK = "facebook",
}


export interface ISigninWithProviderPayload {
  provider:AuthIdentityProvider;
  credentials:string;
}