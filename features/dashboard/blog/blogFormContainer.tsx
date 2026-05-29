"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/constants/isActive";
import { useQueryClient } from "@tanstack/react-query";
import { responseHandler } from "@/lib/tools/responseHandler";
import { IBlog } from "@/lib/types/blog";
import { useCreateBlog, useUpdateBlog } from "@/lib/hooks/blog";
import { blogsRoutes } from "@/lib/routes/apiRoutes";

interface IFormContainerProps {
  blog?: IBlog;
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
  blog,
  onOpenChage,
}) => {
  const queryClient = useQueryClient();
  const { mutate: createMutate, isPending: isCreatePending } = useCreateBlog();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateBlog();
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
        title: blog?.title || "",
        description: blog?.description || "",
        pictureId: blog?.pictureId?.id || "",
        alt: blog?.alt || "",
        isActive: blog?.isActive === false ? "0" : "1",
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
      id: blog?.id as string,
    };
    if (blog) {
      updateMutate(updatePayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [blogsRoutes.getAll()],
          });
          responseHandler.success("مقاله با ویرایش ایجاد شد");
          onOpenChage();
        },
      });
    } else {
      createMutate(createPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [blogsRoutes.getAll()],
          });
          responseHandler.success("مقاله با موفقیت ایجاد شد");
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
              label="نام مقاله"
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
          aspect={384/456}
          htmlFor="categoryMainImage"
          value={pictureId}
          changeImageHandler={(value: string) => setValue("pictureId", value)}
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
          isLoading={isCreatePending || isUpdatePending}
          fullWidth
          type="submit"
          color={blog ? "warning" : "success"}
        >
          {blog ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
