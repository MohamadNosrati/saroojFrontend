import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CommentsRoute } from "../routes/apiRoutes";
import { commentServices, findOne, getAll } from "../services/comments";
import { responseHandler } from "../tools/responseHandler";

export const useGetComments = () => {
  const { data, isLoading } = useQuery({
    queryKey: [CommentsRoute.getAll()],
    queryFn: async () => await getAll(),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useGetComment = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [CommentsRoute.findOne(String(id))],
    queryFn: async () => await findOne(String(id)),
    enabled: Boolean(id),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: async (payload: ICommentPayload) =>
      await commentServices.create(payload),
    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد نظر");
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await commentServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CommentsRoute.getAll()] });
      responseHandler.success(" نظر با موفقیت حذف شد");
    },
    onError: () => {
      responseHandler.fail("خطا در حذف نظر");
    },
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: async (payload: IUpdateCommentPayload) => {
      const { id, ...rest } = payload;

      return await commentServices.update(payload?.id, rest);
    },
    onError: () => {
      responseHandler.fail("خطا در ویرایش نظر");
    },
  });
};
