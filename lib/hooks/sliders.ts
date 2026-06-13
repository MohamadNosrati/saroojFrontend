import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { responseHandler } from "../tools/responseHandler";
import { sliderRoutes } from "../routes/apiRoutes";
import { findOne, getAll, sliderServices } from "../services/sliders";
import { ISliderPayload, UpdateSliderPayload } from "../types/slider";

export const useGetSliders = () => {
  const { data, isLoading } = useQuery({
    queryKey: [sliderRoutes.getAll()],
    queryFn: async () => await getAll(),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useGetSlider = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [sliderRoutes.findOne(String(id))],
    queryFn: async () => await findOne(String(id)),
    enabled: Boolean(id),
  });

  return {
    data: data?.data,
    isLoading,
  };
};

export const useCreateSlider = () => {
  return useMutation({
    mutationFn: async (payload: ISliderPayload) =>
      await sliderServices.create(payload),
    onError: (error) => {
      responseHandler.fail(error?.message || "خطا در ایجاد اسلایدر");
    },
  });
};

export const useDeleteSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await sliderServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [sliderRoutes.getAll()] });
      responseHandler.success("اسلایدر با موفقیت حذف شد");
    },
    onError: () => {
      responseHandler.fail("خطا در حذف اسلایدر");
    },
  });
};

export const useUpdateSlider = () => {
  return useMutation({
    mutationFn: async (payload: UpdateSliderPayload) => {
      const { id, ...rest } = payload;

      return await sliderServices.update(payload?.id, rest);
    },
    onError: () => {
      responseHandler.fail("خطا در ویرایش اسلایدر");
    },
  });
};
