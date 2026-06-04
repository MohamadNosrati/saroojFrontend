import { notificationRoutes } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { INotification, INotificationPayload } from "../types/notification";
import axiosInstance from "./base";

export const getAll = async () => {
  return await axiosInstance.get<IBaseResponse<INotification[]>>(
    notificationRoutes.getAll(),
  );
};

class NotificationServices {
  create(payload: INotificationPayload) {
    return axiosInstance.post(notificationRoutes.create(), payload);
  }
}

export const notificationServices = new NotificationServices();
