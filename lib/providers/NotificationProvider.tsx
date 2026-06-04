"use client";

import { useEffect } from "react";
import { notficationHelpers } from "@/lib/tools/notificationHelpers";
import { servicWorkerHelpers } from "@/lib/tools/servicWorkerHelpers";
import { useCreateSubscription } from "@/lib/hooks/subscription";

export const NotificationProvider = () => {
  const { mutate } = useCreateSubscription();
  const enablePushNotifications = async () => {
    const permission = await notficationHelpers.getPermission();

    if (permission !== "granted") {
      return;
    }

    const registeration = await servicWorkerHelpers.registerServiceWorker();
    const subscription = await registeration.pushManager.getSubscription();
    if (!subscription) {
      const subscription = await notficationHelpers.subscribeUser(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      );
      mutate(subscription);
    }
  };
  useEffect(() => {
    enablePushNotifications();
  }, []);
  return null;
};
