import { useMutation } from "@tanstack/react-query";

import { responseHandler } from "../tools/responseHandler";
import { subscriptionServices } from "../services/subscription";
import { ISubscriptionPayload } from "../types/subscription";

export const useCreateSubscription = () => {
  return useMutation({
    mutationFn: async (payload: ISubscriptionPayload) =>
      await subscriptionServices.create(payload),
    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد سابسکریپشن");
    },
  });
};
