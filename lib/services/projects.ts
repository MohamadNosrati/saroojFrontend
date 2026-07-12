import { ProjectsRoute } from "../routes/apiRoutes";
import { IBaseResponse, IPaginatedResponse } from "../types/base";
import { IProject, IProjectParams, IProjectPayload } from "../types/project";

import axiosInstance from "./base";

export const getAll = async (params: IProjectParams) => {
  return await axiosInstance.get<IBaseResponse<IPaginatedResponse<IProject>>>(
    ProjectsRoute.getAll(),
    {
      params,
    },
  );
};

export const findOne = async (id: string) => {
  return await axiosInstance.get<IBaseResponse<IProject>>(
    ProjectsRoute.findOne(id),
  );
};

// export const findProjectBySlug = async (slug: string) => {
//   return await axiosInstance.get(ProjectsRoute.findBySlug(slug));
// };

class ProjectServices {
  create(payload: IProjectPayload) {
    return axiosInstance.post<IBaseResponse<IProject>>(
      ProjectsRoute.create(),
      payload,
    );
  }

  delete(id: string) {
    return axiosInstance.delete(ProjectsRoute.delete(id));
  }

  update(id: string, payload: Partial<IProjectPayload>) {
    return axiosInstance.patch(ProjectsRoute.update(id), payload);
  }
}

export const projectServices = new ProjectServices();
