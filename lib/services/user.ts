import { userRoutes } from "../routes/apiRoutes";
import { IUserPayload } from "../types/user";
import axiosInstance from "./base";

class UserServices {
  update(id: string, payload: Partial<IUserPayload>) {
    return axiosInstance.patch(userRoutes.update(id), payload);
  }
}

export const userServices = new UserServices();
