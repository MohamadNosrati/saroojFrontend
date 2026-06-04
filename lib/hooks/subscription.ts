import { useMutation} from "@tanstack/react-query";
import { responseHandler } from "../tools/responseHandler";
import { subscriptionServices } from "../services/subscription";
import { ISubscriptionPayload } from "../types/subscription";

// export const useGetBlogs = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: [blogsRoutes.getAll()],
//     queryFn: async () => await getAll(),
//   });
//   return {
//     data: data?.data,
//     isLoading,
//   };
// };

export const useCreateSubscription = () => {
  return useMutation({
    mutationFn: async (payload: ISubscriptionPayload) =>
      await subscriptionServices.create(payload),
    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد سابسکریپشن");
    },
  });
};

// export const useDeleteBlog = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (id: string) => await blogervices.delete(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [blogsRoutes.getAll()] });
//       responseHandler.success("مقاله با موفقیت حذف شد");
//     },
//     onError: () => {
//       responseHandler.fail("خطا در حذف مقاله");
//     },
//   });
// };
