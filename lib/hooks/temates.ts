import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TeamatesRoute } from "../routes/apiRoutes";
import { findOne, getAll, temateServices } from "../services/teamates";
import { responseHandler } from "../tools/responseHandler";
import { ITeamatePayload, IUpdateTeamatePayload } from "../types/teamate";

export const useGetTemates = () => {
  const { data, isLoading } = useQuery({
    queryKey: [TeamatesRoute.getAll()],
    queryFn: async () => await getAll(),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useGetTeamate = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [TeamatesRoute.findOne(String(id))],
    queryFn: async () => await findOne(String(id)),
    enabled: Boolean(id),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useDeleteTeamate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await temateServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TeamatesRoute.getAll()] });
      responseHandler.success("عضو تیم با موفقیت حذف شد");
    },
    onError: () => {
      responseHandler.fail("خطا در حذف عضو تیم");
    },
  });
};

export const useCreateTeamate = () => {
  return useMutation({
    mutationFn: async (payload: ITeamatePayload) =>
      await temateServices.create(payload),
    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد عضو تیم");
    },
  });
};

export const useUpdateTeamate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IUpdateTeamatePayload) => {
      const { id, ...rest } = payload;

      return await temateServices.update(payload?.id, rest);
    },
    onError: () => {
      responseHandler.fail("خطا در ویرایش دسته بندی");
    },
  });
};
