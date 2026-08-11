"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";

import { IAssitantMessageRole } from "@/lib/types/assistantMessage";
import { CustomWhen } from "@/components/ui/CustomWhen";
import {
  useCreateAssistantMessage,
  useGetChatAssistantMessages,
} from "@/lib/hooks/assistantMessage";
import { useUpdateAssistantMessageChace } from "@/lib/hooks/updateCache";
import {
  assistantChatRoutes,
  assistantMessageRoutes,
} from "@/lib/routes/apiRoutes";
import CustomInput from "@/components/ui/CustomInput";

function TypingIndicator() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="
        self-end
        flex
        items-center
        gap-3
        rounded-3xl
        bg-white/80
        dark:bg-zinc-800/80
        backdrop-blur-md
        px-5
        py-4
        shadow-lg
        border
        border-white/20
        dark:border-zinc-700
      "
      initial={{ opacity: 0, y: 10 }}
    >
      <div className="flex gap-1">
        {[0, 1, 2].map((item) => (
          <motion.span
            key={item}
            animate={{
              y: [0, -5, 0],
            }}
            className="
              size-2
              rounded-full
              bg-primary
            "
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: item * 0.15,
            }}
          />
        ))}
      </div>

      <span className="text-sm text-default-500">Thinking...</span>
    </motion.div>
  );
}

function Avatar({ type }: { type: "assistant" | "user" }) {
  return (
    <div
      className={`
        shrink-0
        size-8
        rounded-full
        flex
        items-center
        justify-center
        text-sm
        shadow-md

        ${
          type === "assistant"
            ? `
              bg-gradient-to-br
              from-primary
              to-secondary
              text-white
            `
            : `
              bg-default-200
              dark:bg-zinc-700
            `
        }
      `}
    >
      {type === "assistant" ? "🤖" : "👤"}
    </div>
  );
}

interface IProps {
  chatId: string;
  sessionId: string;
  setChatId: Dispatch<SetStateAction<string>>;
}

export default function Messages({ chatId, sessionId, setChatId }: IProps) {
  const { data, isLoading, isFetching } = useGetChatAssistantMessages(
    chatId || "",
  );
  // const { data: assistantStatus, isLoading: isLoadingStatus } =
  //   useCheckAssistantStatus();
  const queryClient = useQueryClient();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [userText, setUserText] = useState("");

  const { mutate, isPending } = useCreateAssistantMessage();

  const { updateCache } = useUpdateAssistantMessageChace();
  const date = new Date();

  console.log("chatId", chatId);

  const handleSendMessage = () => {
    updateCache(chatId as string, {
      id: uuidv4(),
      createdAt: date.getTime(),
      updatedAt: date.getTime(),
      role: IAssitantMessageRole.USER,
      chatId: sessionId as string,
      text: userText,
    });

    mutate(
      {
        text: userText,
        chatId: chatId,
        sessionId: sessionId,
        role: IAssitantMessageRole.USER,
      },
      {
        onSuccess: (response) => {
          if (!chatId) {
            setChatId(response?.data?.data?.chatId || "");
          }
          queryClient.invalidateQueries({
            queryKey: [
              assistantMessageRoutes.getChatMessages(chatId as string),
            ],
          });
          queryClient.invalidateQueries({
            queryKey: [
              assistantChatRoutes.getSessionChats(sessionId as string),
            ],
          });
        },
      },
    );

    setUserText("");
  };

  useEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        buttonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleClick);

    return () => document.removeEventListener("keydown", handleClick);
  }, []);
  const t = useTranslations("Header.bot");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [data, isPending]);

  return (
    <div className="flex flex-1 flex-col gap-3 p-5">
      <motion.div
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
        relative
        h-full
        overflow-hidden
        rounded-3xl

        bg-gradient-to-b
        from-default-50
        to-default-100

        dark:from-zinc-950
        dark:to-zinc-900

        border
        border-default-200
        dark:border-zinc-800

        shadow-inner
        p-4
      "
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
      >
        {/* Background glow */}
        <div
          className="
          pointer-events-none
          absolute
          -top-32
          -left-32
          size-72
          rounded-full
          bg-primary/20
          blur-3xl
        "
        />

        <div
          className="
          pointer-events-none
          absolute
          -bottom-32
          -right-32
          size-72
          rounded-full
          bg-secondary/20
          blur-3xl
        "
        />

        <AnimatePresence mode="popLayout">
          <div className="flex w-full flex-col h-full gap-2.5">
            <div
              className="grow overflow-y-auto
              overflow-x-hidden
              scrollbar-thin w-full"
            >
              {!isLoading ? (
                <div
                  ref={messagesContainerRef}
                  className="
              relative
              z-10
              h-full
              flex
              flex-col
              gap-4
              
            "
                >
                  {/* Welcome message */}
                  <motion.div
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                self-end
                flex
                items-end
                gap-2
                max-w-[80%]
              "
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                  >
                    <div
                      className="
                  rounded-xl
                  px-2
                  py-1

                  bg-white/80
                  dark:bg-zinc-800/80

                  backdrop-blur-md

                  border
                  border-white/20
                  dark:border-zinc-700

                  shadow-lg

                  leading-7
                "
                    >
                      {t("defaultMessage")}
                    </div>

                    <Avatar type="assistant" />
                  </motion.div>

                  {data?.data?.map((message, index) => {
                    const isAssistant = message.role === "assistant";

                    return (
                      <motion.div
                        key={message.id}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        className={`
                    flex
                    items-start
                    gap-2

                    ${isAssistant ? "self-end" : "self-start"}

                    max-w-[85%]
                  `}
                        initial={{
                          opacity: 0,
                          y: 20,
                          scale: 0.96,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 22,
                          delay: index * 0.03,
                        }}
                      >
                        {!isAssistant && <Avatar type="user" />}

                        <div
                          className={`
                      rounded-xl
                      px-2
                      py-1
                      leading-7

                      shadow-lg

                      ${
                        isAssistant
                          ? `
                            bg-white/90
                            dark:bg-zinc-800/90

                            border
                            border-default-200
                            dark:border-zinc-700

                            backdrop-blur-md
                          `
                          : `
                            bg-gradient-to-br
                            from-primary
                            to-primary-600

                            text-white

                            shadow-primary/20
                          `
                      }
                    `}
                        >
                          {message.text}
                        </div>

                        {isAssistant && <Avatar type="assistant" />}
                      </motion.div>
                    );
                  })}

                  <CustomWhen condition={isPending}>
                    <TypingIndicator />
                  </CustomWhen>
                </div>
              ) : (
                <div
                  className="
              size-full
              flex
              items-center
              justify-center
            "
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    className="
                size-10
                rounded-full
                border-4
                border-primary/30
                border-t-primary
              "
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                </div>
              )}
            </div>
            <motion.div
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
    relative
    mt-2
    flex
    w-full
    items-center
    gap-3

    rounded-3xl

    border
    border-default-200
    dark:border-zinc-700

    bg-white/70
    dark:bg-zinc-900/70

    backdrop-blur-xl

    p-3

    shadow-lg
    shadow-black/5
    dark:shadow-black/20
  "
              initial={{
                opacity: 0,
                y: 15,
              }}
            >
              <CustomInput
                fullWidth
                className="
      flex-1

      rounded-2xl

      bg-transparent

      border-none

      shadow-none

      text-base

      focus-within:ring-0
    "
                isDisabled={isLoading || isPending || !sessionId}
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
              />

              <Button
                ref={buttonRef}
                className="
      shrink-0

      rounded-2xl

      px-7
      h-12

      font-bold

      bg-gradient-to-r
      from-primary
      to-secondary

      text-white

      shadow-lg
      shadow-primary/30

      transition-transform

      hover:scale-105
    "
                isDisabled={!userText || !sessionId || isLoading || isPending}
                isLoading={isPending}
                onPress={handleSendMessage}
              >
                {t("sendButton")}
              </Button>
            </motion.div>
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
