import { Skeleton } from "@heroui/skeleton";
import { Spinner } from "@heroui/spinner";
import { AnimatePresence, motion } from "framer-motion";

import { IAssistantMessage } from "@/lib/types/assistant";
import { useEffect, useRef } from "react";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { useLocale } from "next-intl";

const PERSIANSTATICMESSAGE = "سلام 👋 چطور می‌توانم کمکتان کنم؟";
const ENGLISHSTATICMESSAGE = "hi 👋 how can i help you!";

interface IProps {
  data: IAssistantMessage[];
  isLoading: boolean;
  isPending: boolean;
  isFetching: boolean;
}

export default function Messages({
  data,
  isLoading,
  isFetching,
  isPending,
}: IProps) {
  const locale = useLocale();
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
    <motion.div
      layout
      animate={{ opacity: 1 }}
      className="dark:bg-dark h-96 max-h-96 rounded-2xl bg-default-100 p-4 flex flex-col gap-3"
      initial={{ opacity: 0 }}
    >
      <AnimatePresence>
        {!isLoading ? (
          <div
            ref={messagesContainerRef}
            className="w-full flex flex-col gap-2 overflow-y-auto overflow-x-hidden"
          >
            <motion.div
              layout
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              className={`max-w-[80%] mx-2.5 rounded-2xl px-4 py-3 shadow-sm self-end bg-secondary dark:text-dark`}
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
              {locale === "fa" ? PERSIANSTATICMESSAGE : ENGLISHSTATICMESSAGE}
            </motion.div>
            {data?.map((message, index) => (
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
                    ? "self-end bg-secondary dark:text-dark"
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
            <CustomWhen condition={isPending}>
              <div className="w-4/5 py-3 bg-secondary self-end flex justify-center items-center rounded-2xl">
                <Spinner />
              </div>
            </CustomWhen>
          </div>
        ) : (
          <div className="size-full flex justify-center items-center">
            <Spinner color="primary" size="lg" />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
