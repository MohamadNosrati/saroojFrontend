import { assistantMessageRoutes } from "../routes/apiRoutes";
import {
  IAssistantMessage,
  IAssistantMessagePayload,
  IAssistantStatus,
  ICreateMessageResponse,
} from "../types/assistantMessage";
import { IBaseResponse } from "../types/base";

import axiosInstance from "./base";

export const getChatAssitantMessages = async (sessionId: string) => {
  return await axiosInstance.get<IBaseResponse<IAssistantMessage[]>>(
    assistantMessageRoutes.getChatMessages(sessionId),
  );
};

export const getAssistantStatus = async () => {
  return await axiosInstance.get<IBaseResponse<IAssistantStatus>>(
    assistantMessageRoutes.checkStatus(),
  );
};

class AssistantServices {
  create(payload: IAssistantMessagePayload) {
    return axiosInstance.post<IBaseResponse<ICreateMessageResponse>>(
      assistantMessageRoutes.create(),
      payload,
    );
  }
}

export const assistantServices = new AssistantServices();
