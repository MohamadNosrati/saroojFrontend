import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { Dispatch, SetStateAction } from "react";

import { dateConvertor } from "@/lib/tools/dateConvertor";
import { useGetSessionAssistantMessages } from "@/lib/hooks/assistantChat";

interface IProps {
  sessionId: string;
  setChatId: Dispatch<SetStateAction<string>>;
  chatId: string;
}

export default function Chats({ sessionId, chatId, setChatId }: IProps) {
  const { data, isLoading } = useGetSessionAssistantMessages(
    sessionId as string,
  );
  const locale = useLocale();

  return (
    <aside className="hidden w-64 flex-col gap-4 border-e border-default-200 p-4 dark:border-zinc-800 md:flex">
      <Button
        className="rounded-2xl font-semibold"
        color="primary"
        onPress={() => setChatId("")}
      >
        + New chat
      </Button>

      <div className="flex h-full flex-col gap-2 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          data?.data?.map((chat) => (
            <button
              key={chat.id}
              className={clsx(
                "rounded-2xl py-1.5 px-2.5 flex flex-col text-start text-sm transition",
                chatId === chat?.id
                  ? "hover:bg-default-100 bg-white dark:hover:bg-zinc-800"
                  : "border-2 border-primary",
              )}
              onClick={() => setChatId(chat.id)}
            >
              <p className="truncate font-medium">
                {chat?.title.substring(0, 20)}
              </p>
              <span className="text-xs block text-default-500">
                {dateConvertor(chat.createdAt, locale === "en")}
              </span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
