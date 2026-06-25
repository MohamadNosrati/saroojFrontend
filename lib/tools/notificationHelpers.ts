import { ISubscriptionPayload } from "../types/subscription";

import { responseHandler } from "./responseHandler";

class NotificationHelpers {
  readonly STORAGE_KEY: string = "pwa_prompt_last_shown";
  readonly TWENTY_FOUR_HOURS: number = 24 * 60 * 60 * 1000;

  async getPermission() {
    if (!("Notification" in window)) {
      responseHandler.fail(
        "broswer doest not support notification . we suggest to install sarooj pwa app.",
      );
    }

    const permission = await Notification.requestPermission();

    return permission;
  }

  async subscribeUser(vapidPublicKey: string): Promise<ISubscriptionPayload> {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(
        vapidPublicKey,
      ) as BufferSource,
    });

    return {
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      keys: {
        p256dh: this.arrayBufferToBase64(subscription.getKey("p256dh")!),
        auth: this.arrayBufferToBase64(subscription.getKey("auth")!),
      },
    };
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);

    let binary = "";

    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }

    return btoa(binary);
  }

  urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  shouldShowPrompt() {
    const lastShown = localStorage.getItem(this.STORAGE_KEY);
    if (!lastShown) return true;
    return Date.now() - parseInt(lastShown, 10) >= this.TWENTY_FOUR_HOURS;
  }
}

export const notficationHelpers = new NotificationHelpers();
