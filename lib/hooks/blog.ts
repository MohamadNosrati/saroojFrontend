import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { responseHandler } from "../tools/responseHandler";
import { blogsRoutes } from "../routes/apiRoutes";
import { IBlogPayload, UpdateBlogPayload, } from "../types/blog";
import { blogervices, findOne, getAll } from "../services/blog";

export const useGetBlogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: [blogsRoutes.getAll()],
    queryFn: async () => await getAll(),
  });
  return {
    data: data?.data,
    isLoading,
  };
};

export const useGetBlog = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [blogsRoutes.findOne(String(id))],
    queryFn: async () => await findOne(String(id)),
    enabled: Boolean(id),
  });
  return {
    data: data?.data,
    isLoading,
  };
};

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: async (payload: IBlogPayload) =>
      await blogervices.create(payload),
    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد مقاله");
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await blogervices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [blogsRoutes.getAll()] });
      responseHandler.success("مقاله با موفقیت حذف شد");
    },
    onError: () => {
      responseHandler.fail("خطا در حذف مقاله");
    },
  });
};

export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: async (payload: UpdateBlogPayload) => {
      const { id, ...rest } = payload;
      return await blogervices.update(payload?.id, rest);
    },
    onError: () => {
      responseHandler.fail("خطا در ویرایش مقاله");
    },
  });
};
