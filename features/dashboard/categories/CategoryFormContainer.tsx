"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { ICategory } from "@/lib/types/categories";
import { useCreateCategory } from "@/lib/hooks/categories";
import { isActiveOptions } from "@/lib/config/isActive";
import { useQueryClient } from "@tanstack/react-query";
import { categoriesRoute } from "@/lib/routes/apiRoutes";
import { responseHandler } from "@/lib/tools/responseHandler";

interface IFormContainerProps {
  category?: ICategory;
}

type TformValues = {
  title: string;
  description: string;
  pictureId: string;
  isActive: "0" | "1";
  alt: string;
};

const FormContainer: React.FC<IFormContainerProps> = ({ category }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useCreateCategory();
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
        pictureId: category?.pictureId.id || "",
        alt: category?.alt || "",
        isActive: category?.isActive === false ? "0" : "1",
      },
    });
  const { pictureId } = watch();
  const onSubmit = async (data: TformValues) => {
    console.log("inHere", data);
    const payload = {
      ...data,
      isActive: data?.isActive === "1" ? true : false,
    };
    mutate(payload, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey: [categoriesRoute.getAll()],
        });
        responseHandler.success("دسته بندی با موفقیت ایجاد شد");
        reset();
      },
    });
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
        <CustomImageLoader
          value={pictureId}
          setValue={(value: string) => setValue("pictureId", value)}
        />
      </div>
      <div>
        <CustomSelect
          selectLabel="وضعیت"
          options={isActiveOptions}
          control={control}
          name="isActive"
        />
      </div>
      <div>
        <Button
          className="font-bold"
          isLoading={isPending}
          fullWidth
          type="submit"
          color="success"
        >
          {category ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
