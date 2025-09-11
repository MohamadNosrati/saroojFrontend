import { categoriesRoute } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { ICategory, ICategoryPayload } from "../types/categories";
import axiosInstance from "./base";

export const getAll = async () => {
  return await axiosInstance.get<IBaseResponse<ICategory[]>>(categoriesRoute.getAll());
};

export const findOne = async (id: string) => {
  return await axiosInstance.get(categoriesRoute.findOne(id));
};

class CategoryServices {
  create(payload: ICategoryPayload) {
  return  axiosInstance.post(categoriesRoute.create(), payload);
  }

  delete(id: string) {
    return  axiosInstance.delete(categoriesRoute.delete(id));
  }

  update(id: string, payload: Partial<ICategoryPayload>) {
    return axiosInstance.patch(categoriesRoute.update(id), payload);
  }
}

export const categoryServices = new CategoryServices();
