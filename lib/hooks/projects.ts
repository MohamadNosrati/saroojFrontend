import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { responseHandler } from "../tools/responseHandler";
import { ProjectsRoute } from "../routes/apiRoutes";
import { findOne, getAll, projectServices } from "../services/projects";
import { IProjectPayload, IUpdateProjectPayload } from "../types/project";

export const useGetProjects = () => {
  const { data, isLoading } = useQuery({
    queryKey: [ProjectsRoute.getAll()],
    queryFn: async () =>
      await getAll({
        limit: 100,
        page: 1,
      }),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useGetProject = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [ProjectsRoute.findOne(String(id))],
    queryFn: async () => await findOne(String(id)),
    enabled: Boolean(id),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useCreateProject = () => {
  return useMutation({
    mutationFn: async (payload: IProjectPayload) =>
      await projectServices.create(payload),
    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد پروژه");
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await projectServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProjectsRoute.getAll()] });
      responseHandler.success("پروژه با موفقیت حذف شد");
    },
    onError: () => {
      responseHandler.fail("خطا در حذف پروژه");
    },
  });
};

export const useUpdateProject = () => {
  return useMutation({
    mutationFn: async (payload: IUpdateProjectPayload) => {
      const { id, ...rest } = payload;

      return await projectServices.update(payload?.id, rest);
    },
    onError: () => {
      responseHandler.fail("خطا در ویرایش پروژه ");
    },
  });
};
