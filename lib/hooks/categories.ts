import { useQuery } from "@tanstack/react-query";
import { categoriesRoute } from "../routes/apiRoutes";
import { getAll } from "../services/categories";

export const useGetCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: [categoriesRoute.getAll()],
    queryFn: async () => await getAll(),
  });
  return {
    data: data?.data,
    isLoading,
  };
};
