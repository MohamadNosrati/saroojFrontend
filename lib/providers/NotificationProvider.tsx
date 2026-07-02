"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import { notficationHelpers } from "@/lib/tools/notificationHelpers";
import { servicWorkerHelpers } from "@/lib/tools/servicWorkerHelpers";
import { useCreateSubscription } from "@/lib/hooks/subscription";
import { CustomWhen } from "@/components/ui/CustomWhen";

import { yekanBakh } from "../config/fonts";

export const NotificationProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isSearchingPrompt, setIsSearchingPrompt] = useState(true);
  const { mutate } = useCreateSubscription();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsSearchingPrompt(false);
    };
    const timer = setTimeout(() => {
      setIsSearchingPrompt(false);
    }, 2000);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const enablePushNotifications = async () => {
      const isNotificationSupported =
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window;

      if (!isNotificationSupported) {
        if (notficationHelpers.shouldShowPrompt()) {
          setIsOpen(true);
          localStorage.setItem(
            notficationHelpers.STORAGE_KEY,
            Date.now().toString(),
          );
        }

        return;
      }

      try {
        const permission = await notficationHelpers.getPermission();

        // --- CASE B: Browser supports it, but permission was denied/blocked ---
        if (permission !== "granted") {
          if (notficationHelpers.shouldShowPrompt()) {
            setIsOpen(true);
            localStorage.setItem(
              notficationHelpers.STORAGE_KEY,
              Date.now().toString(),
            );
          }

          return;
        }

        const registration = await servicWorkerHelpers.registerServiceWorker();
        const subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
          const newSubscription = await notficationHelpers.subscribeUser(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
          );

          mutate(newSubscription);
        }
      } catch (error) {
        console.error("Error setting up notifications:", error);
      }
    };

    enablePushNotifications();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      clearTimeout(timer);
    };
  }, [mutate]);

  const handleInstallClick = async (onClose: () => void) => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      localStorage.setItem(
        notficationHelpers.STORAGE_KEY,
        (Date.now() + notficationHelpers.TWENTY_FOUR_HOURS * 365).toString(),
      );
    }
    setDeferredPrompt(null);
    onClose();
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        base: "bg-white font-yekan dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
        closeButton:
          "left-2 right-auto hover:bg-zinc-100 dark:hover:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700",
      }}
      dir="rtl"
      isOpen={isOpen}
      placement="center"
      style={
        { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
      }
      onOpenChange={setIsOpen}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold text-right">
              تجربه کامل برنامه
            </ModalHeader>
            <ModalBody className="text-right">
              <p className="text-zinc-600 dark:text-zinc-400 text-justify text-sm leading-relaxed">
                دسترسی به اعلان‌ها توسط شما یا مرورگرتان مسدود شده است. برای
                اینکه هیچ به‌روزرسانی یا پیام مهمی را از دست ندهید، پیشنهاد
                می‌کنیم وب-اپلیکیشن ما را نصب کنید.
              </p>
              <>
                <div>
                  <p className="mt-2 text-sm text-zinc-500 text-justify dark:text-zinc-400 font-medium">
                    با کلیک روی دکمه
                    <span className="text-primary font-bold">نصب برنامه</span>
                    زیر، می‌توانید اپلیکیشن را مستقیماً روی دستگاه خود نصب کنید.
                  </p>
                </div>
                <div className="mt-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-xs text-zinc-500 dark:text-zinc-400 leading-6">
                  <span className="font-semibold block mb-1 text-zinc-700 dark:text-zinc-300">
                    راهنمای نصب دستی:
                  </span>
                  <ul className="list-disc list-inside space-y-1 pr-2">
                    <li>
                      <strong>آیفون (Safari):</strong> روی دکمه
                      <span className="underline">Share</span> بزنید و گزینه
                      <strong className="text-primary">
                        {"Add to Home Screen"}
                      </strong>
                      را انتخاب کنید.
                    </li>
                    <li>
                      <strong>اندروید / Chrome:</strong> روی آیکون سه نقطه بالا
                      بزنید و گزینه
                      <strong className="text-primary">{"Install App"}</strong>
                      را انتخاب کنید.
                    </li>
                  </ul>
                </div>
              </>
            </ModalBody>
            <ModalFooter className="flex justify-end gap-2">
              <Button
                className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
                color="secondary"
                variant="light"
                onPress={onClose}
              >
                متوجه شدم
              </Button>
              <CustomWhen condition={isSearchingPrompt || deferredPrompt}>
                <Button
                  className="font-medium shadow-md shadow-primary/20"
                  color="primary"
                  isLoading={isSearchingPrompt}
                  onPress={() => handleInstallClick(onClose)}
                >
                  {isSearchingPrompt
                    ? "در حال برسی سیستم"
                    : "نصب  خودکار برنامه"}
                </Button>
              </CustomWhen>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
