import { uploadRoutes } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { IFile, IFilePayload } from "../types/file";

import axiosInstance from "./base";

export const findUpload = async (id: string) => {
  return await axiosInstance.get<IBaseResponse<IFile>>(uploadRoutes.find(id));
};

class UploadService {
  upload(payload: IFilePayload) {
    const formData = new FormData();

    formData.set("image", payload?.image);

    // formData.set("x", String(payload?.x));
    // formData.set("y", String(payload?.y));
    // formData.set("width", String(payload?.width));
    // formData.set("height", String(payload?.height));
    return axiosInstance.postForm<IBaseResponse<IFile>>(
      uploadRoutes.upload(),
      formData,
    );
  }
}

export const uploadServices = new UploadService();
