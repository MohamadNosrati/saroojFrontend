import { useQuery } from "@tanstack/react-query";
import { CommentsRoute } from "../routes/apiRoutes";
import { getAll } from "../services/comments";

export const useGetComments = () => {
  const { data, isLoading } = useQuery({
    queryKey: [CommentsRoute.getAll()],
    queryFn: async () => await getAll(),
  });
  return {
    data: data?.data,
    isLoading,
  };
};
