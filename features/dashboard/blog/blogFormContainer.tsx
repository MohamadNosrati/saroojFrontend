"use client";
import CustomInput from "@/components/ui/CustomInput";
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
import { CustomWhen } from "@/components/ui/CustomWhen";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

interface IFormContainerProps {
  blog?: IBlog;
  onOpenChage: () => void;
}

export type TformValues = {
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
  const { handleSubmit, control, reset , watch } =
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
          queryClient.invalidateQueries({
            queryKey: [blogsRoutes.findOne(blog?.id)],
          });
          responseHandler.success("مقاله با ویرایش ایجاد شد");
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
          onOpenChage();
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
              label="توضیحات عکس"
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <SimpleEditor initialContent={value} onChange={onChange} />
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
                aspect={610/352}
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
          color={blog ? "warning" : "success"}
        >
          {blog ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
