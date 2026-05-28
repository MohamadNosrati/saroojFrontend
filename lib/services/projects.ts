import { ProjectsRoute } from "../routes/apiRoutes";
import { IProjectPayload } from "../types/project";
import axiosInstance from "./base";

export const getAll = async () => {
  return await axiosInstance.get(ProjectsRoute.getAll());
};

export const findOne = async (id: string) => {
  return await axiosInstance.get(ProjectsRoute.findOne(id));
};

// export const findProjectBySlug = async (slug: string) => {
//   return await axiosInstance.get(ProjectsRoute.findBySlug(slug));
// };

class ProjectServices {
  create(payload: IProjectPayload) {
    return axiosInstance.post(ProjectsRoute.create(), payload);
  }

  delete(id: string) {
    return axiosInstance.delete(ProjectsRoute.delete(id));
  }

  update(id: string, payload: Partial<IProjectPayload>) {
    return axiosInstance.patch(ProjectsRoute.update(id), payload);
  }
}

export const projectServices = new ProjectServices();
