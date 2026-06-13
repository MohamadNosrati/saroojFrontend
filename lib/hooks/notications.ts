import { useMutation, useQuery } from "@tanstack/react-query";

import { notificationRoutes } from "../routes/apiRoutes";
import { getAll, notificationServices } from "../services/notification";
import { INotificationPayload } from "../types/notification";
import { responseHandler } from "../tools/responseHandler";

export const useGetNotifications = () => {
  const { data, isLoading } = useQuery({
    queryKey: [notificationRoutes.getAll()],
    queryFn: async () => await getAll(),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useCreateNotification = () => {
  return useMutation({
    mutationFn: async (payload: INotificationPayload) =>
      await notificationServices.create(payload),
    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد  نوتیفیکشن");
    },
  });
};
