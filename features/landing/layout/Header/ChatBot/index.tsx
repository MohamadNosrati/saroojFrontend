"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useLocale, useTranslations } from "next-intl";

import { yekanBakh } from "@/lib/config/fonts";
import { useSessionStore } from "@/lib/stores/session";

import Messages from "./Messages";
import Chats from "./Chats";
import { dirSelector } from "@/lib/tools/dataSelectors";
import { LocaleEnum } from "@/lib/types/base";

const ChatBot = () => {
  const locale = useLocale();
  const t = useTranslations("Header.bot");

  const [chatId, setChatId] = useState("");

  const sessionId = useSessionStore((state) => state.sessionId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dir = dirSelector(locale as LocaleEnum);

  return (
    <>
      <Button
        className="font-bold text-dark shadow-lg dark:text-white"
        color="primary"
        onPress={onOpen}
      >
        {t("button")}
      </Button>

      <Modal
        classNames={{
          base: `
            font-yekan
            overflow-hidden rounded-3xl
            border border-white/20
            bg-white/90 dark:bg-zinc-950/90
            backdrop-blur-xl
            shadow-[0_25px_100px_rgba(0,0,0,.35)]
          `,
          header: "p-5",
          body: "p-0",
          footer: "p-5",
        }}
        dir={dir}
        isOpen={isOpen}
        size="5xl"
        style={
          {
            "--font-yekan": yekanBakh.style.fontFamily,
          } as React.CSSProperties
        }
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl shadow-lg">
                    🤖
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">{t("title")}</h2>

                    <div className="flex items-center gap-2 text-xs text-default-500">
                      <span className="size-2 animate-pulse rounded-full bg-green-500" />
                      Online assistant
                    </div>
                  </div>
                </div>
              </ModalHeader>

              <ModalBody>
                <div className="flex h-[520px]">
                  <Chats
                    chatId={chatId}
                    sessionId={sessionId as string}
                    setChatId={setChatId}
                  />
                  <Messages
                    chatId={chatId}
                    sessionId={sessionId as string}
                    setChatId={setChatId}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatBot;
