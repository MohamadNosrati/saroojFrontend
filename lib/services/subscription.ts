import { subscriptionRoutes } from "../routes/apiRoutes";
import { ISubscriptionPayload } from "../types/subscription";

import axiosInstance from "./base";

class SubscriptionServices {
  create(payload: ISubscriptionPayload) {
    return axiosInstance.post(subscriptionRoutes.create(), payload);
  }
}

export const subscriptionServices = new SubscriptionServices();
