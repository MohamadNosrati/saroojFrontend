import { useQueryClient } from "@tanstack/react-query";

const useUpdateCache = () => {
  const queryClient = useQueryClient();

  const updateCache = (key: string, item: any) => {
    queryClient.setQueryData([key], (old: any) => {
      if (!old) return old;

      return {
        ...old,
        data: {
          ...old.data,
          data: [...(old.data?.data || []), item],
        },
      };
    });
  };

  return { updateCache };
};

export default useUpdateCache;
