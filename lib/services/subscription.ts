import { subscriptionRoutes } from "../routes/apiRoutes";
import { ISubscriptionPayload } from "../types/subscription";
import axiosInstance from "./base";

class SubscriptionServices {
  create(payload: ISubscriptionPayload) {
    return axiosInstance.post(subscriptionRoutes.create(), payload);
  }

  delete(id: string) {
    return axiosInstance.delete(subscriptionRoutes.delete(id));
  }
}

export const subscriptionServices = new SubscriptionServices();
