import { ProjectsRoute } from "../routes/apiRoutes"
import { IProjectPayload } from "../types/project"
import axiosInstance from "./base"

export const getAll =async ()=>{
    return await axiosInstance.get(ProjectsRoute.getAll())
}

export const create =async (payload : IProjectPayload)=>{
    return await axiosInstance.post(ProjectsRoute.create(),payload)
}

export const findOne =async (id:string)=>{
    return await axiosInstance.get(ProjectsRoute.findOne(id))
}

export const deleteCategory = async (id:string)=>{
    return await axiosInstance.delete(ProjectsRoute.delete(id))
}

export const update =async (id:string,payload : Partial<IProjectPayload>)=>{
    return await axiosInstance.patch(ProjectsRoute.update(id),payload)
}