import { IAssistantMessage } from "@/lib/types/assistant";
import { Skeleton } from "@heroui/skeleton";
import { Spinner } from "@heroui/spinner";
import { AnimatePresence, motion } from "framer-motion";

const STATICMESSAGE = "سلام 👋 چطور می‌توانم کمکتان کنم؟";

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
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      className="dark:bg-dark h-96 max-h-96 rounded-2xl bg-default-100 p-4 flex flex-col gap-3"
      initial={{ opacity: 0 }}
    >
      <AnimatePresence>
        {!isLoading ? (
          <div className="w-full overflow-hidden">
            <motion.div
              layout
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm self-end bg-secondary dark:text-white`}
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
