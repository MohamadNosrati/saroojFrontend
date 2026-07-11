import { assistantRoutes } from "../routes/apiRoutes";
import {
  IAssistantMessage,
  IAssistantMessagePayload,
} from "../types/assistant";
import { IBaseResponse } from "../types/base";

import axiosInstance from "./base";

export const getSessionIdAssitantMessages = async (sessionId: string) => {
  return await axiosInstance.get<IBaseResponse<IAssistantMessage[]>>(
    assistantRoutes.getSessionIdMessages(sessionId),
  );
};

class AssistantServices {
  create(payload: IAssistantMessagePayload) {
    return axiosInstance.post(assistantRoutes.create(), payload);
  }
}

export const assistantServices = new AssistantServices();
