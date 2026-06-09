import { useQuery } from "@tanstack/react-query";
import { messageRoutes } from "../routes/apiRoutes";
import { getConversationMessages } from "../services/message";

export const useGetConversationMessages = (conversationId?:string) => {
    const { data, isLoading } = useQuery({
      queryKey: [messageRoutes.getConversationMessages(conversationId)],
      queryFn: async () => await getConversationMessages(conversationId),
      enabled:Boolean(conversationId)
    });
    return {
      data: data?.data?.data,
      isLoading,
    };
  };
  