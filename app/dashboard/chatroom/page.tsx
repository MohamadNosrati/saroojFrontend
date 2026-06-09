"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Spinner } from "@heroui/spinner";
import { responseHandler } from "@/lib/tools/responseHandler";
import Tabs from "@/features/dashboard/chatroom/Tabs";
import Chat from "@/features/dashboard/chatroom/Chat";
import { IConversation } from "@/lib/types/conversation";
import { IUser } from "@/lib/types/user";
import { getCookie } from "@/lib/actions/auth";
import useUpdateCache from "@/lib/hooks/updateCache";
import { messageRoutes } from "@/lib/routes/apiRoutes";

const eventNames = {
  sendMessage: "send_message",
  receiveMessage: "receive_message",
  connect: "connect",
  disconnect: "disconnect",
  connectError: "connect_error",
};

export default function Chatroom() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const {updateCache} = useUpdateCache()
  const [selectedConversation, setSelectedConversation] = useState<
    IConversation | undefined
  >(undefined);
  const [selectedContact, setSelectedContact] = useState<IUser | undefined>(
    undefined,
  );

  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initializeSocket() {
      try {
        const token = await getCookie();
        if (!token) {
          console.error("No authentication token found");
          responseHandler.fail("Authentication required");
          setIsConnecting(false);
          return;
        }

        const socket = io("http://localhost:8000", {
          withCredentials: true,
          auth: {
            token: token,
          },
        });

        socketRef.current = socket;

        socket.on(eventNames.connect, () => {
          console.log("Connected to server");
          if (isMounted) {
            setIsConnected(true);
            setIsConnecting(false);
          }
        });

        socket?.on(eventNames.receiveMessage, (response) => {
          console.log("a pm cameeee")
          updateCache(
            messageRoutes.getConversationMessages(selectedConversation?.id),
            response?.data?.message,
          );
        });



        socket.on(eventNames.disconnect, () => {
          if (isMounted) {
            setIsConnected(false);
          }
        });

        socket.on(eventNames.connectError, (error) => {
          if (isMounted) {
            setIsConnecting(false);
            if (socket.active) {
              setIsConnected(false);
            } else {
              responseHandler.fail(error.message || "Connection failed");
            }
          }
        });
      } catch (error) {
        console.error("Error initializing socket:", error);
        if (isMounted) {
          setIsConnecting(false);
          responseHandler.fail("Failed to connect to chat server");
        }
      }
    }

    initializeSocket();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex h-full bg-gray-900 overflow-hidden">
      <div className="h-full w-60">
        <Tabs
          setSelectedConversation={setSelectedConversation}
          selectedConversation={selectedConversation}
          setSelectedContact={setSelectedContact}
          selectedContact={selectedContact}
        />
      </div>
      <div className="h-full relative justify-center items-center grow flex flex-col">
        {isConnecting ? (
          <Spinner size="lg" label="Connecting to chat..." />
        ) : isConnected ? (
          <Chat
            setSelectedConversation={setSelectedConversation}
            selectedContact={selectedContact}
            selectedConversation={selectedConversation}
            socketRef={socketRef}
            isConnected={isConnected}
            chatBottomRef={chatBottomRef}
          />
        ) : (
          <div className="text-center text-red-500">
            Failed to connect to chat server. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
