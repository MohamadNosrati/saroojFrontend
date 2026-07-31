import { assistantChatRoutes } from "../routes/apiRoutes";
import { IAssistantChat } from "../types/assistantChat";
import { IBaseResponse } from "../types/base";
import axiosInstance from "./base";

export const getSessionAssistantChats = async (sessionId: string) => {
  return await axiosInstance.get<IBaseResponse<IAssistantChat[]>>(
    assistantChatRoutes.getSessionChats(sessionId),
  );
};
