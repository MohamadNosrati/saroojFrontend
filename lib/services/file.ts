import { filesRoute } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { IFile, IFilePayload } from "../types/file";
import axiosInstance from "./base";

class FileService {
    upload(payload:IFilePayload){
        return axiosInstance.postForm<IBaseResponse<IFile[]>>(filesRoute.upload(),payload)
    }
}

export const fileServices = new FileService();