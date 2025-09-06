import { TeamatesRoute } from "../routes/apiRoutes"
import { ITeamatePayload } from "../types/teamate"
import axiosInstance from "./base"

export const getAll =async ()=>{
    return await axiosInstance.get(TeamatesRoute.getAll())
}

export const create =async (payload : ITeamatePayload)=>{
    return await axiosInstance.post(TeamatesRoute.create(),payload)
}

export const findOne =async (id:string)=>{
    return await axiosInstance.get(TeamatesRoute.findOne(id))
}

export const deleteCategory = async (id:string)=>{
    return await axiosInstance.delete(TeamatesRoute.delete(id))
}

export const update =async (id:string,payload : Partial<ITeamatePayload>)=>{
    return await axiosInstance.patch(TeamatesRoute.update(id),payload)
}