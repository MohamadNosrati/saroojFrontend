import { AuthRoute } from "../routes/apiRoutes";
import { ISigninRes, ISinginPayload } from "../types/auth";
import { IBaseResponse } from "../types/base";
import axiosInstance from "./base";

class AuthService {
  signin(paylod: ISinginPayload) {
    return axiosInstance.post<IBaseResponse<ISigninRes>>(AuthRoute.signin(), paylod);
  }
}

export const authServices = new AuthService();

