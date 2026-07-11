"use client";

import CustomInput from "@/components/ui/CustomInput";
import { yekanBakh } from "@/lib/config/fonts";
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
import { useState } from "react";

const ChatBot = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", text: "سلام 👋 چطور می‌توانم کمکتان کنم؟" },
    { id: 2, role: "user", text: "می‌خواهم درباره خدمات ساروج بدانم." },
    { id: 3, role: "assistant", text: "حتماً، در چه زمینه‌ای سوال دارید؟" },
    { id: 4, role: "user", text: "پروژه‌های ساختمانی." },
  ]);
  const [userText, setUserText] = useState<string>("");
  const handleSendMessage = () => {
    setMessages((prv) => [
      ...prv,
      {
        id: 100,
        role: "user",
        text: userText,
      },
    ]);
    setUserText("");
  };
  return (
    <>
      <Button color="primary" onPress={onOpen}>
        دستیار
      </Button>

      <Modal
        classNames={{
          base: "font-yekan",
        }}
        style={
          { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
        }
        size="5xl"
        dir="rtl"
        isOpen={isOpen}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="dark:bg-dark h-96 max-h-96 overflow-y-auto rounded-2xl bg-default-100 p-4 flex flex-col gap-3"
                >
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 15,
                          scale: 0.98,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          delay: index * 0.05,
                          duration: 0.25,
                        }}
                        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                          message.role === "assistant"
                            ? "self-end bg-secondary dark:text-white"
                            : "self-start bg-primary text-white"
                        }`}
                      >
                        {message.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </ModalBody>

              <ModalFooter>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex w-full gap-2.5"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onPress={handleSendMessage}
                      color="primary"
                      className="min-w-fit"
                    >
                      ارسال
                    </Button>
                  </motion.div>

                  <div className="grow">
                    <CustomInput
                      value={userText}
                      onChange={(e) => setUserText(e?.target?.value)}
                      fullWidth
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
