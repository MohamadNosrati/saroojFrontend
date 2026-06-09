import { userRoutes } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { IUser, IUserPayload } from "../types/user";
import axiosInstance from "./base";


export const getAll = async () => {
  return await axiosInstance.get<IBaseResponse<IUser[]>>(
    userRoutes.getAll()
  );
};
class UserServices {
  update(id: string, payload: Partial<IUserPayload>) {
    return axiosInstance.patch(userRoutes.update(id), payload);
  }
}

export const userServices = new UserServices();
