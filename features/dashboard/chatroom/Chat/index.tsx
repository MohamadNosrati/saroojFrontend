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
import clsx from "clsx";

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
          scrollToBottom();
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

  return (
    <>
      {ChateSelected ? (
        <>
          <div className="grow flex flex-col gap-y-6 p-6 w-full max-h-[calc(100%-88px)] pb-10 overflow-y-auto scroll-smooth custom-scrollbar">
            <CustomWhen condition={Boolean(messages?.length)}>
              {messages?.map((item, index) => (
                <MessageItem key={item?.date} item={item} />
              ))}
            </CustomWhen>

            {/* Empty State Screen */}
            <CustomWhen condition={!Boolean(messages?.length) && !isLoading}>
              <div className="size-full flex flex-col justify-center items-center gap-3 opacity-60">
                <span className="text-slate-400 font-medium text-sm">
                  هنوز پیامی ارسال نشده است.
                </span>
                <span className="text-primary text-xs tracking-wider font-semibold">
                  گفت‌وگو را شروع کنید!
                </span>
              </div>
            </CustomWhen>

            {/* Content Loading State */}
            <CustomWhen condition={isLoading}>
              <div className="size-full flex justify-center items-center">
                <Spinner color="primary" size="lg" />
              </div>
            </CustomWhen>

            <div ref={chatBottomRef} className="h-2 shrink-0" />
          </div>

          {/* Floating Input Action Dock */}
          <div className="p-4 absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex gap-3 items-center">
            <div className="w-full flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 backdrop-blur-md p-1.5 px-3 rounded-xl shadow-xl shadow-black/40">
              <CustomInput
                className="w-full bg-transparent focus:outline-none text-slate-100 placeholder:text-slate-500 text-sm"
                placeholder="پیام خود را بنویسید..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                ref={buttonRef}
                className={clsx(
                  "h-10 px-5 font-bold rounded-lg transition-all duration-200 shrink-0",
                  text.trim() === ""
                    ? "bg-slate-800 text-slate-500"
                    : "bg-primary text-slate-950 shadow-lg shadow-primary/20 font-extrabold hover:opacity-90",
                )}
                isDisabled={text.trim() === ""}
                onClick={handleSendMessage}
              >
                ارسال
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="size-full flex flex-col items-center justify-center gap-2 opacity-50">
          <span className="text-slate-400 font-semibold text-sm">
            یک گفتگو را برای شروع پیام‌رسانی انتخاب کنید
          </span>
        </div>
      )}
    </>
  );
};

export default Chat;
