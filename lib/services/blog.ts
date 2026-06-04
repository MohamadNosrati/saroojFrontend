import { blogsRoutes } from "../routes/apiRoutes";
import { IBaseResponse, IPaginatedResponse } from "../types/base";
import { IBlog, IBlogPayload } from "../types/blog";
import axiosInstance from "./base";

export const getAll = async () => {
  return await axiosInstance.get<IBaseResponse<IPaginatedResponse<IBlog>>>(
    blogsRoutes.getAll(),
  );
};

export const findOne = async (id: string) => {
  return await axiosInstance.get<IBaseResponse<IBlog>>(blogsRoutes.findOne(id));
};

class BlogServices {
  create(payload: IBlogPayload) {
    return axiosInstance.post(blogsRoutes.create(), payload);
  }

  delete(id: string) {
    return axiosInstance.delete(blogsRoutes.delete(id));
  }

  update(id: string, payload: Partial<IBlogPayload>) {
    return axiosInstance.patch(blogsRoutes.update(id), payload);
  }
}

export const blogervices = new BlogServices();
