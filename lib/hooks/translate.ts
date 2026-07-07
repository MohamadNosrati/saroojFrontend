import { useMutation } from "@tanstack/react-query";
import { responseHandler } from "../tools/responseHandler";
import { translateServices } from "../services/translate";

export const useTranslate = () => {
  return useMutation({
    mutationFn: async (payload: Record<string, string>) =>
      await translateServices.traslate(payload),
    onSuccess: () => {
      responseHandler.success("ترجمه با موفقیت انجام شد");
    },
    onError: () => {
      responseHandler.warning("خطا در ترجمه هوش مصنوعی پیش آمده");
    },
  });
};
