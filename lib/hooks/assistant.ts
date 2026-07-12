import { useMutation, useQuery } from "@tanstack/react-query";

import { responseHandler } from "../tools/responseHandler";
import { assistantRoutes } from "../routes/apiRoutes";
import {
  assistantServices,
  getSessionIdAssitantMessages,
} from "../services/assistant";
import { IAssistantMessagePayload } from "../types/assistant";

export const useGetSessionIdAssistantMessages = (sessionId: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [assistantRoutes.getSessionIdMessages(sessionId)],
    queryFn: async () => await getSessionIdAssitantMessages(sessionId),
    enabled: Boolean(sessionId),
  });

  return {
    data: data?.data,
    isLoading,
    isFetching: isFetching,
  };
};

export const useCreateAssistantMessage = () => {
  return useMutation({
    mutationFn: async (payload: IAssistantMessagePayload) =>
      await assistantServices.create(payload),

    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد پیام دستیار");
    },
  });
};
