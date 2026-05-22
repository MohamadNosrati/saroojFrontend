import { AxiosResponse } from "axios";
import { sliderRoutes } from "../routes/apiRoutes";
import { ISlider, ISliderPayload } from "../types/slider";
import axiosInstance from "./base";

export const getAll =async ()=>{
    return await axiosInstance.get<AxiosResponse<ISlider[]>>(sliderRoutes.getAll())
}


export const findOne =async (id:string)=>{
    return await axiosInstance.get<AxiosResponse<ISlider>>(sliderRoutes.findOne(id))
}


class SlidersServices {
    create(payload: ISliderPayload) {
    return  axiosInstance.post(sliderRoutes.create(), payload);
    }
  
    delete(id: string) {
      return  axiosInstance.delete(sliderRoutes.delete(id));
    }
  
    update(id: string, payload: Partial<ISliderPayload>) {
      return axiosInstance.patch(sliderRoutes.update(id), payload);
    }
  }
  
  export const sliderServices = new SlidersServices();
