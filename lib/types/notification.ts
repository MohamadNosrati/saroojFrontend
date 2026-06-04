export interface NotificationAction {
  action: string;
  title: string;
}

export interface NotificationPayload {
  notification: {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    vibrate?: number[];
    data?: {
      dateOfArrival?: number;
      primaryKey?: number;
      url?: string;
      [key: string]: any;
    };
    actions?: NotificationAction[];
  };
}

export interface INotification {
  title: string;
  url: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}
export interface INotificationPayload {
  title: string;
  url: string;
  description: string;
}
