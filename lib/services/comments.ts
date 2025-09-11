import { CommentsRoute } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import axiosInstance from "./base";

export const getAll = async () => {
  return await axiosInstance.get<IBaseResponse<IComment[]>>(
    CommentsRoute.getAll()
  );
};

export const findOne = async (id: string) => {
  return await axiosInstance.get(CommentsRoute.findOne(id));
};

class CommentServices {
  create(payload: ICommentPayload) {
    return axiosInstance.post(CommentsRoute.create(), payload);
  }

  delete(id: string) {
    return axiosInstance.delete(CommentsRoute.delete(id));
  }

  update(id: string, payload: Partial<ICommentPayload>) {
    return axiosInstance.patch(CommentsRoute.update(id), payload);
  }
}

export const commentServices = new CommentServices();
