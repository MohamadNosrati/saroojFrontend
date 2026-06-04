import { useMutation } from "@tanstack/react-query";
import { IUpdateUserPayload } from "../types/user";
import { responseHandler } from "../tools/responseHandler";
import { userServices } from "../services/user";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (payload: IUpdateUserPayload) => {
      const { id, ...rest } = payload;
      return await userServices.update(payload?.id, rest);
    },
    onError: () => {
      responseHandler.fail("خطا در ویرایش یوزر");
    },
  });
};
