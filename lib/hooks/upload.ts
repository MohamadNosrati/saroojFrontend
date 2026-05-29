import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadRoutes } from "../routes/apiRoutes";
import { findUpload, uploadServices } from "../services/upload";
import { responseHandler } from "../tools/responseHandler";
import { IFilePayload } from "../types/file";

export const useFindUpload = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [uploadRoutes.find(id)],
    queryFn: () => findUpload(id),
    enabled: Boolean(id),
  });
  return {
    data: data?.data,
    isLoading: isLoading,
  };
};

export const useUpload = () => {
  return useMutation({
    mutationFn: async (payload: IFilePayload) =>
      await uploadServices.upload(payload),
    onSuccess: () => {
      responseHandler.success("فایل با موفقیت آپلود شد");
    },
    onError: () => {
      responseHandler.fail("خطا در آئلود فایل");
    },
  });
};
