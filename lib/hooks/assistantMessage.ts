import { useMutation, useQuery } from "@tanstack/react-query";

import { responseHandler } from "../tools/responseHandler";
import { assistantMessageRoutes } from "../routes/apiRoutes";
import {
  assistantServices,
  getAssistantStatus,
  getChatAssitantMessages,
} from "../services/assistantMessage";
import { IAssistantMessagePayload } from "../types/assistantMessage";

export const useGetChatAssistantMessages = (chatId: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [assistantMessageRoutes.getChatMessages(chatId)],
    queryFn: async () => await getChatAssitantMessages(chatId),
    enabled: Boolean(chatId),
  });

  return {
    data: data?.data,
    isLoading,
    isFetching: isFetching,
  };
};
export const useCheckAssistantStatus = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [assistantMessageRoutes.checkStatus()],
    queryFn: async () => await getAssistantStatus(),
  });

  return {
    data: data?.data,
    isLoading,
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
