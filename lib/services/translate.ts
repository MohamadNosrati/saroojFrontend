import { translateRoutes } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";

import axiosInstance from "./base";

class TranslateServices {
  traslate(payload: Record<string, string>) {
    return axiosInstance.post<IBaseResponse<Record<string, any>>>(
      translateRoutes.translate(),
      payload,
    );
  }
}

export const translateServices = new TranslateServices();
