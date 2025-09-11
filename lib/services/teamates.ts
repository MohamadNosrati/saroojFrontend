import { TeamatesRoute } from "../routes/apiRoutes";
import { IBaseResponse } from "../types/base";
import { ITeamate, ITeamatePayload } from "../types/teamate";
import axiosInstance from "./base";

export const getAll = async () => {
  return await axiosInstance.get<IBaseResponse<ITeamate[]>>(TeamatesRoute.getAll());
};

export const findOne = async (id: string) => {
  return await axiosInstance.get(TeamatesRoute.findOne(id));
};

class TeamateServices {
  create(payload: ITeamatePayload) {
    return axiosInstance.post<IBaseResponse<ITeamate>>(TeamatesRoute.create(), payload);
  }

  delete(id: string) {
    return axiosInstance.delete<IBaseResponse<undefined>>(TeamatesRoute.delete(id));
  }

  update(id: string, payload: Partial<ITeamatePayload>) {
    return  axiosInstance.patch(TeamatesRoute.update(id), payload);
  }
}

export const temateServices=  new TeamateServices();