import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/conversation";
import { conversationRoutes } from "../routes/apiRoutes";

export const useGetConversations = (userId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [conversationRoutes.getUserConversations(userId)],
    queryFn: async () => await getAll(userId),
    enabled: Boolean(userId)
  });
  return {
    data: data?.data,
    isLoading,
  };
};
