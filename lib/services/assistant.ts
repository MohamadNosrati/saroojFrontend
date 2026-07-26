import { assistantRoutes } from "../routes/apiRoutes";
import {
  IAssistantMessage,
  IAssistantMessagePayload,
  IAssistantStatus,
} from "../types/assistant";
import { IBaseResponse } from "../types/base";

import axiosInstance from "./base";

export const getSessionIdAssitantMessages = async (sessionId: string) => {
  return await axiosInstance.get<IBaseResponse<IAssistantMessage[]>>(
    assistantRoutes.getSessionIdMessages(sessionId),
  );
};

export const getAssistantStatus = async () => {
  return await axiosInstance.get<IBaseResponse<IAssistantStatus>>(
    assistantRoutes.checkStatus(),
  );
};

class AssistantServices {
  create(payload: IAssistantMessagePayload) {
    return axiosInstance.post(assistantRoutes.create(), payload);
  }
}

export const assistantServices = new AssistantServices();
