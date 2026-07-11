"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Spinner } from "@heroui/spinner";
import { useQueryClient } from "@tanstack/react-query";

import { responseHandler } from "@/lib/tools/responseHandler";
import Tabs from "@/features/dashboard/chatroom/Tabs";
import Chat from "@/features/dashboard/chatroom/Chat";
import { IConversation } from "@/lib/types/conversation";
import { IUser } from "@/lib/types/user";
import { getCookie } from "@/lib/actions/auth";
import { conversationRoutes, messageRoutes } from "@/lib/routes/apiRoutes";
import { useAuthStore } from "@/lib/stores/auth";
import { eventNames } from "@/lib/config/socket";
import { useUpdateChatMessageCache } from "@/lib/hooks/updateCache";

export default function Chatroom() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const { updateCache } = useUpdateChatMessageCache();
  const [selectedConversation, setSelectedConversation] = useState<
    IConversation | undefined
  >(undefined);
  const [selectedContact, setSelectedContact] = useState<IUser | undefined>(
    undefined,
  );

  const user = useAuthStore((state) => state?.user);
  const queryClient = useQueryClient();

  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    async function initializeSocket() {
      try {
        const token = await getCookie();

        if (!token) {
          console.error("No authentication token found");
          responseHandler.fail("Authentication required");
          setIsConnecting(false);

          return;
        }

        const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
          withCredentials: true,
          auth: {
            token: token,
          },
        });

        socketRef.current = socket;

        socket.on(eventNames.connect, () => {
          console.log("Connected to server");
          setIsConnected(true);
          setIsConnecting(false);
        });

        socket?.on(eventNames.receiveMessage, (data) => {
          updateCache(
            messageRoutes.getConversationMessages(data?.conversationId),
            data,
          );
          queryClient.invalidateQueries({
            queryKey: [conversationRoutes.getUserConversations(user?.id)],
          });
          socket.emit(eventNames.messageDelivered, {
            messageId: data.id,
          });
        });

        socket.on(eventNames.disconnect, () => {
          setIsConnected(false);
        });

        socket.on(eventNames.connectError, (error) => {
          setIsConnecting(false);
          if (socket.active) {
            setIsConnected(false);
          } else {
            responseHandler.fail(error.message || "Connection failed");
          }
        });
      } catch (error) {
        console.error("Error initializing socket:", error);
        setIsConnecting(false);
        responseHandler.fail("Failed to connect to chat server");
      }
    }

    initializeSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user?.id]);

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-950/40 rounded-2xl">
      {/* Contacts & Conversations Sidebar */}
      <div className="h-full w-72 shrink-0 border-l border-slate-800 bg-slate-900/30 flex flex-col">
        <Tabs
          selectedContact={selectedContact}
          selectedConversation={selectedConversation}
          setSelectedContact={setSelectedContact}
          setSelectedConversation={setSelectedConversation}
        />
      </div>

      {/* Chat Main Section */}
      <div className="h-full relative justify-center items-center grow flex flex-col bg-slate-950/10">
        {isConnecting ? (
          <div className="flex flex-col gap-3 items-center">
            <Spinner color="primary" size="lg" />
            <span className="text-slate-400 text-sm font-medium">
              در حال اتصال به گفت‌وگو...
            </span>
          </div>
        ) : isConnected ? (
          <Chat
            chatBottomRef={chatBottomRef}
            isConnected={isConnected}
            selectedContact={selectedContact}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            socketRef={socketRef}
          />
        ) : (
          <div className="text-center p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl max-w-sm mx-auto text-sm font-semibold">
            خطا در اتصال به سرور چت. لطفاً دوباره تلاش کنید.
          </div>
        )}
      </div>
    </div>
  );
}
