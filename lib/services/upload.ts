import { uploadRoutes } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { IFile } from "../types/file";
import axiosInstance from "./base";

export const findUpload = async (id: string) => {
  return await axiosInstance.get<IBaseResponse<IFile>>(uploadRoutes.find(id));
};

class UploadService {
  upload(files: Blob) {
    const formData = new FormData();
    formData.set("images", files);
    return axiosInstance.postForm<IBaseResponse<IFile[]>>(
      uploadRoutes.upload(),
      formData,
    );
  }
}

export const uploadServices = new UploadService();
