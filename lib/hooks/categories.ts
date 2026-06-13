import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { categoriesRoute } from "../routes/apiRoutes";
import { categoryServices, findOne, getAll } from "../services/categories";
import { ICategoryPayload, UpdateCategoryPayload } from "../types/categories";
import { responseHandler } from "../tools/responseHandler";

export const useGetCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: [categoriesRoute.getAll()],
    queryFn: async () => await getAll(),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useGetCategory = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [categoriesRoute.findOne(String(id))],
    queryFn: async () => await findOne(String(id)),
    enabled: Boolean(id),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (payload: ICategoryPayload) =>
      await categoryServices.create(payload),
    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد دسته بندی");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await categoryServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [categoriesRoute.getAll()] });
      responseHandler.success("دسته بندی با موفقیت حذف شد");
    },
    onError: () => {
      responseHandler.fail("خطا در حذف دسته بندی");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateCategoryPayload) => {
      const { id, ...rest } = payload;

      return await categoryServices.update(payload?.id, rest);
    },
    onError: () => {
      responseHandler.fail("خطا در ویرایش دسته بندی");
    },
  });
};
