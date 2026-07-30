"use client";

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
import { useCheckAssistantStatus } from "@/lib/hooks/assistant";

import Messages from "./Messages";

const fakeChats = [
  {
    id: "1",
    title: "Villa renovation consultation",
    date: "Today",
  },
  {
    id: "2",
    title: "Factory construction advice",
    date: "Yesterday",
  },
  {
    id: "3",
    title: "Office remodeling project",
    date: "2 days ago",
  },
];

const ChatBot = () => {
  const locale = useLocale();

  const t = useTranslations("Header.bot");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: assistantStatus, isLoading: isLoadingStatus } =
    useCheckAssistantStatus();

  return (
    <>
      <Button
        className="
          font-bold
          text-dark
          dark:text-white
          shadow-lg
        "
        color="primary"
        isDisabled={!Boolean(assistantStatus?.data?.success)}
        isLoading={isLoadingStatus}
        onPress={onOpen}
      >
        {t("button")}
      </Button>

      <Modal
        classNames={{
          base: `
            font-yekan

            bg-white/90
            dark:bg-zinc-950/90

            backdrop-blur-xl

            border
            border-white/20

            shadow-[0_25px_100px_rgba(0,0,0,.35)]

            rounded-3xl

            overflow-hidden
          `,

          body: "p-0",

          header: "p-5",

          footer: "p-5",
        }}
        dir={locale === "fa" ? "rtl" : "ltr"}
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
                <div
                  className="
                flex
                items-center
                gap-3
              "
                >
                  <div
                    className="
                  size-12

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  bg-gradient-to-br
                  from-primary
                  to-secondary

                  shadow-lg

                  text-xl
                "
                  >
                    🤖
                  </div>

                  <div>
                    <h2
                      className="
                    font-bold
                    text-lg
                  "
                    >
                      {t("title")}
                    </h2>

                    <div
                      className="
                    flex
                    items-center
                    gap-2

                    text-xs
                    text-default-500
                  "
                    >
                      <span
                        className="
                      size-2
                      rounded-full
                      bg-green-500
                      animate-pulse
                    "
                      />
                      Online assistant
                    </div>
                  </div>
                </div>
              </ModalHeader>

              <ModalBody>
                <div
                  className="
                flex
                h-[520px]
              "
                >
                  {/* History sidebar */}

                  <aside
                    className="
                  w-64
                  hidden
                  md:flex

                  flex-col

                  border-default-200
                  dark:border-zinc-800

                  border-e

                  p-4

                  gap-4
                "
                  >
                    <Button
                      color="primary"
                      className="
                    rounded-2xl
                    font-semibold
                  "
                    >
                      + New chat
                    </Button>

                    <div
                      className="
                    flex
                    flex-col
                    gap-2
                    overflow-y-auto
                  "
                    >
                      {fakeChats.map((chat) => (
                        <button
                          key={chat.id}
                          className="
                        text-start

                        rounded-2xl

                        p-3

                        hover:bg-default-100
                        dark:hover:bg-zinc-800

                        transition

                        text-sm
                      "
                        >
                          <p
                            className="
                          font-medium
                          truncate
                        "
                          >
                            {chat.title}
                          </p>

                          <span
                            className="
                          text-xs
                          text-default-500
                        "
                          >
                            {chat.date}
                          </span>
                        </button>
                      ))}
                    </div>
                  </aside>

                  {/* Chat */}

                  <div
                    className="
                  flex-1

                  flex
                  flex-col

                  gap-3

                  p-5
                "
                  >
                    <Messages />
                  </div>
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
