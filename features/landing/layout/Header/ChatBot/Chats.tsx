import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

import { dateConvertor } from "@/lib/tools/dateConvertor";
import { useGetSessionAssistantMessages } from "@/lib/hooks/assistantChat";
import { LocaleEnum } from "@/lib/types/base";

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
  const t = useTranslations("Header.bot");

  return (
    <aside className="hidden w-64 flex-col gap-4 border-e border-default-200 p-4 dark:border-zinc-800 md:flex">
      <Button
        className="rounded-2xl font-semibold"
        color="primary"
        onPress={() => setChatId("")}
      >
        {t("newCchatButton")}
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
                "rounded-2xl cursor-pointer py-1.5 px-2.5 flex flex-col text-start text-sm transition bg-default-100 text-dark dark:text-white dark:bg-zinc-800",
                chatId === chat?.id ? "border-2 border-primary " : "",
              )}
              onClick={() => setChatId(chat.id)}
            >
              <p className="truncate font-medium">
                {chat?.title.substring(0, 40)}
              </p>
              <span className="text-xs block text-default-500">
                {dateConvertor(chat.createdAt, locale as LocaleEnum)}
              </span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
