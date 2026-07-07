"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@heroui/spinner";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import { ITranslatedSliderPayload } from "@/lib/types/slider";
import { useUpdateSlider } from "@/lib/hooks/sliders";
import { responseHandler } from "@/lib/tools/responseHandler";
import { sliderRoutes } from "@/lib/routes/apiRoutes";

interface IFormContainerProps {
  traslatedSliderPayload?: ITranslatedSliderPayload;
  onOpenChangeTranslator: () => void;
  isPending: boolean;
  editId: string;
}

type TformValues = {
  titleEn: string;
  altEn: string;
  descriptionEn: string;
};

const TranslateSliderFormContainer: React.FC<IFormContainerProps> = ({
  onOpenChangeTranslator,
  traslatedSliderPayload,
  isPending,
  editId,
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateSlider();
  const { handleSubmit, control } = useForm<TformValues>({
    defaultValues: {
      titleEn: "",
      descriptionEn: "",
      altEn: "",
    },
    values: {
      titleEn: traslatedSliderPayload?.titleEn || "",
      descriptionEn: traslatedSliderPayload?.descriptionEn || "",
      altEn: traslatedSliderPayload?.altEn || "",
    },
  });
  const onSubmit = async (data: TformValues) => {
    const updatePayload = {
      ...data,
      id: editId as string,
    };

    updateMutate(updatePayload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [sliderRoutes.getAll()],
        });
        queryClient.invalidateQueries({
          queryKey: [sliderRoutes.findOne(editId as string)],
        });
        responseHandler.success("اسلایدر  با موفقیت ویرایش ایجاد شد");
        onOpenChangeTranslator();
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-y-10 min-h-48 items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isPending ? (
        <Spinner size="lg" />
      ) : (
        <>
          <div className="w-full">
            <Controller
              control={control}
              name="titleEn"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="ltr"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="عنوان اسلایدر"
                  labelPlacement="outside-top"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "title is required!",
                },
              }}
            />
          </div>
          <div className="w-full">
            <Controller
              control={control}
              name="descriptionEn"
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => (
                <CustomTextArea
                  dir="ltr"
                  errorMessage={errors?.descriptionEn?.message}
                  isInvalid={Boolean(errors.descriptionEn?.message)}
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "descriptionEn is required!",
                },
              }}
            />
          </div>
          <div className="w-full">
            <Controller
              control={control}
              name="altEn"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="ltr"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="توضیحات عکس"
                  labelPlacement="outside-top"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "altEn is required!",
                },
              }}
            />
          </div>
          <div className="w-full">
            <Button
              fullWidth
              className="font-bold"
              color={"warning"}
              isLoading={isUpdatePending}
              type="submit"
            >
              {"ثبت ترجمه"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default TranslateSliderFormContainer;
