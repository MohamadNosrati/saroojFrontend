import { useQuery } from "@tanstack/react-query";
import { filesRoute } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { IFile } from "../types/file";
import axiosInstance from "./base";

export const useFindFile = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [filesRoute.find(id)],
    queryFn: async () => await axiosInstance.get(filesRoute.find(id)),
    enabled: Boolean(id),
  });
  return {
    data: data?.data,
    isLoading: isLoading,
  };
};

class FileService {
  upload(payload: FormData) {
    return axiosInstance.postForm<IBaseResponse<IFile[]>>(
      filesRoute.upload(),
      payload
    );
  }
}

export const fileServices = new FileService();
