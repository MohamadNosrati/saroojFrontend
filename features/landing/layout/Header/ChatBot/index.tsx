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
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl";

import { yekanBakh } from "@/lib/config/fonts";
import CustomInput from "@/components/ui/CustomInput";
import {
  useCreateAssistantMessage,
  useGetSessionIdAssistantMessages,
} from "@/lib/hooks/assistant";
import { useSessionStore } from "@/lib/stores/session";
import { IAssitantMessageRole } from "@/lib/types/assistant";
import { useUpdateAssistantMessageChace } from "@/lib/hooks/updateCache";
import { assistantRoutes } from "@/lib/routes/apiRoutes";

import Messages from "./Messages";

const ChatBot = () => {
  const t = useTranslations("Header");
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
      <Button
        className="text-dark dark:text-white font-bold"
        color="primary"
        onPress={onOpen}
      >
        {t("bot")}
      </Button>

      <Modal
        classNames={{
          base: "font-yekan",
          body: "m-0",
          header: "pb-0",
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
                <Messages
                  data={data?.data || []}
                  isFetching={isFetching}
                  isLoading={isLoading}
                  isPending={isPending}
                />
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
                      ref={buttonRef}
                      className="min-w-fit"
                      color="primary"
                      isDisabled={
                        !(Boolean(userText) && sessionId) ||
                        isLoading ||
                        isPending
                      }
                      onPress={handleSendMessage}
                    >
                      ارسال
                    </Button>
                  </motion.div>

                  <div className="grow">
                    <CustomInput
                      fullWidth
                      isDisabled={isLoading || isPending || !sessionId}
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
