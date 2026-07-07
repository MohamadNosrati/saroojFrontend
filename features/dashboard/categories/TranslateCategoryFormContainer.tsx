"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import { Spinner } from "@heroui/spinner";
import { responseHandler } from "@/lib/tools/responseHandler";
import { ITranslatedCategoryPayload } from "@/lib/types/categories";
import { useUpdateCategory } from "@/lib/hooks/categories";
import { categoriesRoute } from "@/lib/routes/apiRoutes";

interface IFormContainerProps {
  traslatedCategoryPayload?: ITranslatedCategoryPayload;
  onOpenChangeTranslator: () => void;
  isPending: boolean;
  editId: string;
}

type TformValues = {
  titleEn: string;
  altEn: string;
  descriptionEn: string;
};

const TranslateCategoryFormContainer: React.FC<IFormContainerProps> = ({
  onOpenChangeTranslator,
  traslatedCategoryPayload,
  isPending,
  editId,
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateCategory();
  const { handleSubmit, control } = useForm<TformValues>({
    defaultValues: {
      titleEn: "",
      descriptionEn: "",
      altEn: "",
    },
    values: {
      titleEn: traslatedCategoryPayload?.titleEn || "",
      descriptionEn: traslatedCategoryPayload?.descriptionEn || "",
      altEn: traslatedCategoryPayload?.altEn || "",
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
          queryKey: [categoriesRoute.getAll()],
        });
        queryClient.invalidateQueries({
          queryKey: [categoriesRoute.findOne(editId as string)],
        });
        responseHandler.success("دسته بندی  با موفقیت ویرایش ایجاد شد");
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
                  label="عنوان دسته بندی"
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
              isLoading={isUpdatePending}
              fullWidth
              className="font-bold"
              color={"warning"}
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

export default TranslateCategoryFormContainer;
