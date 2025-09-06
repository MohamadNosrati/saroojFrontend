import { categoriesRoute } from "../routes/apiRoutes"
import { ICategoryPayload } from "../types/categories"
import axiosInstance from "./base"

export const getAll =async ()=>{
    return await axiosInstance.get(categoriesRoute.getAll())
}

export const create =async (payload : ICategoryPayload)=>{
    return await axiosInstance.post(categoriesRoute.create(),payload)
}

export const findOne =async (id:string)=>{
    return await axiosInstance.get(categoriesRoute.findOne(id))
}

export const deleteCategory = async (id:string)=>{
    return await axiosInstance.delete(categoriesRoute.delete(id))
}

export const update =async (id:string,payload : Partial<ICategoryPayload>)=>{
    return await axiosInstance.patch(categoriesRoute.update(id),payload)
}
