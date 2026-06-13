import { useMutation, useQuery } from "@tanstack/react-query";

import { IUpdateUserPayload } from "../types/user";
import { responseHandler } from "../tools/responseHandler";
import { getAll, userServices } from "../services/user";
import { userRoutes } from "../routes/apiRoutes";

export const useGetUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: [userRoutes.getAll()],
    queryFn: async () => await getAll(),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (payload: IUpdateUserPayload) => {
      const { id, ...rest } = payload;

      return await userServices.update(id, rest);
    },
    onError: () => {
      responseHandler.fail("خطا در ویرایش یوزر");
    },
  });
};
