import { AuthRoute } from "../routes/apiRoutes";
import {
  AuthIdentityProvider,
  ISigninRes,
  ISinginPayload,
} from "../types/auth";
import { IBaseResponse } from "../types/base";

import axiosInstance from "./base";

class AuthService {
  signin(paylod: ISinginPayload) {
    return axiosInstance.post<IBaseResponse<ISigninRes>>(
      AuthRoute.signin(),
      paylod,
    );
  }
  signInWithProvider(credentials: string, provider: AuthIdentityProvider) {
    console.log("signIn with provider")
    return axiosInstance.post<IBaseResponse<ISigninRes>>(
      AuthRoute.signInWithProvider(provider),
      {
        credentials,
        provider,
      },
    );
  }
}

export const authServices = new AuthService();
