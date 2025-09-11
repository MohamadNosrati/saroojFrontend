import { useQuery } from "@tanstack/react-query"
import { TeamatesRoute } from "../routes/apiRoutes"
import { getAll } from "../services/teamates"

export const useGetTemates = ()=>{
    const {data,isLoading} = useQuery({
        queryKey:[TeamatesRoute.getAll()],
        queryFn: async()=> await getAll()
    })
    return {
        data:data?.data,isLoading
    }
}