"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { ICategory } from "@/lib/types/categories";
import { useCreateCategory, useUpdateCategory } from "@/lib/hooks/categories";
import { isActiveOptions } from "@/lib/constants/isActive";
import { useQueryClient } from "@tanstack/react-query";
import { categoriesRoute } from "@/lib/routes/apiRoutes";
import { responseHandler } from "@/lib/tools/responseHandler";
import { CustomWhen } from "@/components/ui/CustomWhen";

interface IFormContainerProps {
  category?: ICategory;
  onOpenChage: () => void;
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
  onOpenChage,
}) => {
  const queryClient = useQueryClient();
  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateCategory();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateCategory();
  const { handleSubmit, setValue, watch, control, reset } =
    useForm<TformValues>({
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
  const { pictureId } = watch();
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
          onOpenChage();
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
        },
      });
    }
  };
  return (
    <form className="flex flex-col gap-y-10" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "title is required!",
            },
          }}
          name="title"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="نام دسته بندی"
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "description is required!",
            },
          }}
          name="description"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CustomTextArea
              value={value}
              onChange={onChange}
              isInvalid={Boolean(errors.description)}
              errorMessage={errors?.description?.message}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "alt is required!",
            },
          }}
          name="alt"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="توضیحات غکس"
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="pictureId"
          rules={{
            required: {
              value: true,
              message: "pictureId is required!",
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <CustomImageLoader
                aspect={570/403}
                htmlFor="projectMainImage"
                value={value}
                changeImageHandler={onChange}
              />
              <CustomWhen condition={Boolean(error?.message)}>
                <p className="text-danger mt-1 text-sm font-bold">
                  {error?.message}
                </p>
              </CustomWhen>
            </div>
          )}
        />
      </div>
      <div>
        <Controller
          rules={{
            required: {
              value: true,
              message: "status is required!",
            },
          }}
          name={"isActive"}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomSelect
              error={error?.message}
              selectLabel="وضعیت"
              options={isActiveOptions}
              onSelectionChange={onChange}
              value={value}
            />
          )}
        />
      </div>
      <div>
        <Button
          className="font-bold"
          isLoading={isCreatePending || isUpdatePending}
          fullWidth
          type="submit"
          color={category ? "warning" : "success"}
        >
          {category ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
