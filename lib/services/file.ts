import { filesRoute } from "../routes/apiRoutes";
import axiosInstance from "./base";

class FileService {
    upload(){
        return axiosInstance.postForm(filesRoute.upload())
    }
}

export const fileServices = new FileService();