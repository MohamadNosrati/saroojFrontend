import { useQuery } from "@tanstack/react-query";
import { assistantChatRoutes } from "../routes/apiRoutes";
import { getSessionAssistantChats } from "../services/assistantChat";

export const useGetSessionAssistantMessages = (sessionId: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [assistantChatRoutes.getSessionChats(sessionId)],
    queryFn: async () => await getSessionAssistantChats(sessionId),
    enabled: Boolean(sessionId),
  });

  return {
    data: data?.data,
    isLoading,
    isFetching: isFetching,
  };
};
