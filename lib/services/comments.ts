
import { CommentsRoute } from "../routes/apiRoutes"
import axiosInstance from "./base"

export const getAll =async ()=>{
    return await axiosInstance.get(CommentsRoute.getAll())
}

export const create =async (payload : ICommentPayload)=>{
    return await axiosInstance.post(CommentsRoute.create(),payload)
}

export const findOne =async (id:string)=>{
    return await axiosInstance.get(CommentsRoute.findOne(id))
}

export const deleteCategory = async (id:string)=>{
    return await axiosInstance.delete(CommentsRoute.delete(id))
}

export const update =async (id:string,payload : Partial<ICommentPayload>)=>{
    return await axiosInstance.patch(CommentsRoute.update(id),payload)
}