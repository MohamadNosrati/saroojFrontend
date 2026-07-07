import {  translateRoutes } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";

import axiosInstance from "./base";

class TranslateServices {
  traslate(payload: Record<string, string>) {
    return axiosInstance.post<IBaseResponse<Record<string, string>>>(
      translateRoutes.translate(),
      payload,
    );
  }
}

export const translateServices = new TranslateServices();

