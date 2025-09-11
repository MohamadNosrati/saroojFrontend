import { useQuery } from "@tanstack/react-query"
import { TeamatesRoute } from "../routes/apiRoutes"
import { getAll, temateServices } from "../services/teamates"
import { ITeamate } from "../types/teamate"
import { IBaseResponse } from "../types/base"

export const useGetTemates = ()=>{
    const {data,isLoading} = useQuery({
        queryKey:[TeamatesRoute.getAll()],
        queryFn: async()=> await getAll()
    })
    return {
        data:data?.data,isLoading
    }
}