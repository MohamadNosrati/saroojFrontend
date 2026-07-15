import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { uploadRoutes } from "../routes/apiRoutes";
import { findUpload, getAll, uploadServices } from "../services/upload";
import { responseHandler } from "../tools/responseHandler";
import { IFilePayload } from "../types/file";

export const useGetUploads = () => {
  const { data, isLoading } = useQuery({
    queryKey: [uploadRoutes.getAll()],
    queryFn: () => getAll(),
  });

  return {
    data: data?.data,
    isLoading: isLoading,
  };
};

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

export const useDeleteUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await uploadServices.deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [uploadRoutes.getAll()] });
      responseHandler.success("عکس با موفقیت حذف شد");
    },
    onError: () => {
      responseHandler.fail("خطا در حذف عکس");
    },
  });
};
