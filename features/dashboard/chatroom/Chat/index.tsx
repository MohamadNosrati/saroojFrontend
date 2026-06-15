import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket } from "socket.io-client";

import MessageItem from "./MessageItem";

import CustomInput from "@/components/ui/CustomInput";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { eventNames } from "@/lib/config/socket";
import { useGetConversationMessages } from "@/lib/hooks/message";
import useUpdateCache from "@/lib/hooks/updateCache";
import { conversationRoutes, messageRoutes } from "@/lib/routes/apiRoutes";
import { useAuthStore } from "@/lib/stores/auth";
import { responseHandler } from "@/lib/tools/responseHandler";
import { ISocketAcknowledgement } from "@/lib/types/base";
import { IConversation } from "@/lib/types/conversation";
import { IMessage, MessageStatus, MessageType } from "@/lib/types/message";
import { IUser } from "@/lib/types/user";

interface IProps {
  isConnected: boolean;
  chatBottomRef: React.RefObject<HTMLDivElement>;
  socketRef: React.RefObject<Socket | null>;
  selectedConversation?: IConversation;
  setSelectedConversation: Dispatch<SetStateAction<IConversation | undefined>>;
  selectedContact?: IUser;
}

const Chat: React.FC<IProps> = ({
  isConnected,
  chatBottomRef,
  socketRef,
  selectedConversation,
  selectedContact,
  setSelectedConversation,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state?.user);
  const { data: messages, isLoading } = useGetConversationMessages(
    selectedConversation?.id,
  );
  const [text, setText] = useState("");
  const payload: IMessage = {
    content: text,
    status: {
      status: MessageStatus.SENDING,
    },
    senderId: user?.id as string,
    type: MessageType.TEXT,
    otherUserId: selectedConversation?.otherUser?.id || selectedContact?.id,
    conversationId: selectedConversation?.id || undefined,
  };
  const { updateCache } = useUpdateCache();
  const handleSendMessage = () => {
    socketRef?.current?.emit(
      eventNames.sendMessage,
      payload,
      (
        response: ISocketAcknowledgement<{
          message: IMessage;
          conversation: IConversation;
        }>,
      ) => {
        if (response?.success === true) {
          updateCache(
            messageRoutes.getConversationMessages(selectedConversation?.id),
            response?.data?.message as IMessage,
            true,
          );
          scrollToBottom()
          if (!selectedConversation) {
            setSelectedConversation(response?.data?.conversation);
            queryClient.invalidateQueries({
              queryKey: [conversationRoutes.getUserConversations(user?.id)],
            });
          }
        } else {
          responseHandler.fail("Failed to send message");
        }
      },
    );
    setText("");
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatBottomRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 20);
  };

  useEffect(() => {
    if (isConnected && messages && messages?.length > 0) {
      scrollToBottom();
    }
  }, [isConnected, messages?.length]);

  useEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      if (e?.key === "Enter") {
        buttonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleClick);

    return () => document.removeEventListener("keydown", handleClick);
  }, []);

  const ChateSelected = selectedContact || selectedConversation;

  console.log("messages", messages);

  return (
    <>
      {ChateSelected ? (
        <>
          <div className="grow flex flex-col gap-y-1 p-4 w-full max-h-[calc(100%-80px)] pb-6 overflow-auto">
            <CustomWhen condition={Boolean(messages?.length)}>
              {messages?.map((item, index) => (
                <MessageItem key={item?.date} item={item} />
              ))}
            </CustomWhen>
            <CustomWhen condition={!Boolean(messages?.length) && !isLoading}>
              <div className="size-full flex justify-center items-center">
                <span>start chat!</span>
              </div>
            </CustomWhen>
            <CustomWhen condition={isLoading}>
              <div className="size-full flex justify-center items-center">
                <Spinner size="lg" />
              </div>
            </CustomWhen>
            <div ref={chatBottomRef} className="h-3" />
          </div>
          <div className="p-1.5 absolute min-h-fit bottom-0 z-10 bg-white flex w-full">
            <Button
              ref={buttonRef}
              color="success"
              isDisabled={text.trim() === ""}
              onClick={handleSendMessage}
            >
              ارسال پیام
            </Button>
            <CustomInput
              className="w-full"
              placeholder="پیام خود را بنویسید..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </>
      ) : (
        <div className="size-full flex items-center justify-center">
          <span className="text-white">no chat selected</span>
        </div>
      )}
    </>
  );
};

export default Chat;
