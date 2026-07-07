"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import CustomSelect from "@/components/ui/CustomSelect";
import { ICategory, TCategoryTranslatePayload } from "@/lib/types/categories";
import { useCreateCategory, useUpdateCategory } from "@/lib/hooks/categories";
import { isActiveOptions } from "@/lib/constants/isActive";
import { categoriesRoute } from "@/lib/routes/apiRoutes";
import { responseHandler } from "@/lib/tools/responseHandler";
import { CustomWhen } from "@/components/ui/CustomWhen";

interface IFormContainerProps {
  category?: ICategory;
  translateHandler: (payload: TCategoryTranslatePayload) => void;
}

type TformValues = {
  title: string;
  description: string;
  pictureId: string;
  isActive: "0" | "1";
  alt: string;
};

const FormContainer: React.FC<IFormContainerProps> = ({
  category,
  translateHandler,
}) => {
  const queryClient = useQueryClient();
  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateCategory();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateCategory();
  const { handleSubmit, watch, control, reset } = useForm<TformValues>({
    defaultValues: {
      title: "",
      pictureId: "",
      description: "",
      isActive: "1",
      alt: "",
    },
    values: {
      title: category?.title || "",
      description: category?.description || "",
      pictureId: category?.pictureId?.id || "",
      alt: category?.alt || "",
      isActive: category?.isActive === false ? "0" : "1",
    },
  });
  const onSubmit = async (data: TformValues) => {
    const createPayload = {
      ...data,
      isActive: data?.isActive === "1" ? true : false,
    };
    const updatePayload = {
      ...createPayload,
      id: category?.id as string,
    };

    if (category) {
      updateMutate(updatePayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [categoriesRoute.getAll()],
          });
          queryClient.invalidateQueries({
            queryKey: [categoriesRoute.findOne(category?.id)],
          });
          responseHandler.success("دسته بندی با ویرایش ایجاد شد");
          translateHandler({
            title: data?.title as string,
            alt: data?.alt as string,
            description: data?.description as string,
          });
        },
      });
    } else {
      createMutate(createPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [categoriesRoute.getAll()],
          });
          responseHandler.success("دسته بندی با موفقیت ایجاد شد");
          reset();
          translateHandler({
            title: data?.title as string,
            alt: data?.alt as string,
            description: data?.description as string,
          });
        },
      });
    }
  };

  return (
    <form className="flex flex-col gap-y-10" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="نام دسته بندی"
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
      <div>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CustomTextArea
              errorMessage={errors?.description?.message}
              isInvalid={Boolean(errors.description)}
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "description is required!",
            },
          }}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="alt"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="توضیحات غکس"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "alt is required!",
            },
          }}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="pictureId"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <CustomImageLoader
                aspect={403 / 570}
                changeImageHandler={onChange}
                htmlFor="projectMainImage"
                value={value}
              />
              <CustomWhen condition={Boolean(error?.message)}>
                <p className="text-danger mt-1 text-sm font-bold">
                  {error?.message}
                </p>
              </CustomWhen>
            </div>
          )}
          rules={{
            required: {
              value: true,
              message: "pictureId is required!",
            },
          }}
        />
      </div>
      <div>
        <Controller
          control={control}
          name={"isActive"}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomSelect
              error={error?.message}
              options={isActiveOptions}
              selectLabel="وضعیت"
              value={value}
              onSelectionChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "status is required!",
            },
          }}
        />
      </div>
      <div>
        <Button
          fullWidth
          className="font-bold"
          color={category ? "warning" : "success"}
          isLoading={isCreatePending || isUpdatePending}
          type="submit"
        >
          {category ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
