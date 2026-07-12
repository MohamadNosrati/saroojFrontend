export enum IAssitantMessageRole {
  ASSISTANT = "assistant",
  USER = "user",
}

export interface IAssistantMessagePayload {
  text: string;
  sessionId: string;
  role: IAssitantMessageRole;
}

export interface IAssistantMessage {
  text: string;
  createdAt: number;
  updatedAt: number;
  sessionId: string;
  role: IAssitantMessageRole;
  id: string;
}
