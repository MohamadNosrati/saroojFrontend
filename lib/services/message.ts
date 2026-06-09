import {  messageRoutes } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { IConversation } from "../types/conversation";
import { IMessage } from "../types/message";
import axiosInstance from "./base";

export const getConversationMessages = async (conversationId?:string) => {
    return await axiosInstance.get<IBaseResponse<IMessage[]>>(
        messageRoutes.getConversationMessages(conversationId)
    );
};