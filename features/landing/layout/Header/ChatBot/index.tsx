"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { yekanBakh } from "@/lib/config/fonts";
import CustomInput from "@/components/ui/CustomInput";
import {
  useCreateAssistantMessage,
  useGetSessionIdAssistantMessages,
} from "@/lib/hooks/assistant";
import { Spinner } from "@heroui/spinner";
import { useSessionStore } from "@/lib/stores/session";
import { IAssitantMessageRole } from "@/lib/types/assistant";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { Skeleton } from "@heroui/skeleton";
import { useUpdateAssistantMessageChace } from "@/lib/hooks/updateCache";
import { assistantRoutes } from "@/lib/routes/apiRoutes";

const STATICMESSAGE = "سلام 👋 چطور می‌توانم کمکتان کنم؟";

const ChatBot = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const sessionId = useSessionStore((state) => state.sessionId);
  const { data, isLoading, isFetching } = useGetSessionIdAssistantMessages(
    sessionId || "",
  );
  const [userText, setUserText] = useState<string>("");
  const { mutate, isPending } = useCreateAssistantMessage();
  const { updateCache } = useUpdateAssistantMessageChace();
  const date = new Date();

  const handleSendMessage = () => {
    updateCache(sessionId as string, {
      id: uuidv4(),
      createdAt: date?.getTime(),
      updatedAt: date?.getTime(),
      role: IAssitantMessageRole.USER,
      sessionId: sessionId as string,
      text: userText,
    });
    mutate(
      {
        text: userText,
        sessionId: sessionId as string,
        role: IAssitantMessageRole.USER,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              assistantRoutes.getSessionIdMessages(sessionId as string),
            ],
          });
        },
      },
    );
    setUserText("");
  };

  useEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      if (e?.key === "Enter") {
        buttonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleClick);

    return () => document.removeEventListener("keydown", handleClick);
  }, []);

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        دستیار
      </Button>

      <Modal
        classNames={{
          base: "font-yekan",
        }}
        dir="rtl"
        isOpen={isOpen}
        size="5xl"
        style={
          { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
        }
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-green-500 animate-pulse" />
                  دستیار هوش مصنوعی ساروج
                </div>
              </ModalHeader>

              <ModalBody>
                <motion.div
                  layout
                  animate={{ opacity: 1 }}
                  className="dark:bg-dark h-96 max-h-96 overflow-y-auto rounded-2xl bg-default-100 p-4 flex flex-col gap-3"
                  initial={{ opacity: 0 }}
                >
                  <AnimatePresence>
                    {!isLoading ? (
                      <>
                        <motion.div
                          layout
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          className={`rounded-2xl w-full px-4 py-3 shadow-sm self-end bg-secondary dark:text-white`}
                          initial={{
                            opacity: 0,
                            y: 15,
                            scale: 0.98,
                          }}
                          transition={{
                            delay: 0,
                            duration: 0.25,
                          }}
                        >
                          {STATICMESSAGE}
                        </motion.div>
                        {data?.data?.map((message, index) => (
                          <motion.div
                            key={message.id}
                            layout
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            }}
                            className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                              message.role === "assistant"
                                ? "self-end bg-secondary dark:text-white"
                                : "self-start bg-primary text-white"
                            }`}
                            initial={{
                              opacity: 0,
                              y: 15,
                              scale: 0.98,
                            }}
                            transition={{
                              delay: index * 0.05,
                              duration: 0.25,
                            }}
                          >
                            {message.text}
                          </motion.div>
                        ))}
                        <Skeleton isLoaded={!isPending || !isFetching} />
                      </>
                    ) : (
                      <div className="size-full flex justify-center items-center">
                        <Spinner size="lg" color="primary" />
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ModalBody>

              <ModalFooter>
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex w-full gap-2.5"
                  initial={{ opacity: 0, y: 15 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      isDisabled={
                        !(Boolean(userText) && sessionId) ||
                        isLoading ||
                        isPending
                      }
                      ref={buttonRef}
                      className="min-w-fit"
                      color="primary"
                      onPress={handleSendMessage}
                    >
                      ارسال
                    </Button>
                  </motion.div>

                  <div className="grow">
                    <CustomInput
                      isDisabled={isLoading || isPending || !sessionId}
                      fullWidth
                      value={userText}
                      onChange={(e) => setUserText(e?.target?.value?.trim())}
                    />
                  </div>
                </motion.div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatBot;
