import { conversationRoutes } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { IConversation } from "../types/conversation";

import axiosInstance from "./base";

export const getAll = async (userId?: string) => {
  return await axiosInstance.get<IBaseResponse<IConversation[]>>(
    conversationRoutes.getUserConversations(userId),
  );
};
