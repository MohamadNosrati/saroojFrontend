"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";

import CustomInput from "@/components/ui/CustomInput";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/constants/isActive";
import { responseHandler } from "@/lib/tools/responseHandler";
import { IBlog, TBlogTranslatePayload } from "@/lib/types/blog";
import { useCreateBlog, useUpdateBlog } from "@/lib/hooks/blog";
import { blogsRoutes } from "@/lib/routes/apiRoutes";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { MutableRefObject } from "react";

interface IFormContainerProps {
  blog?: IBlog;
  translateHandler: (payload: TBlogTranslatePayload) => void;
  translateIdRef: MutableRefObject<string | undefined>;
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
  translateHandler,
  translateIdRef,
}) => {
  const queryClient = useQueryClient();
  const { mutate: createMutate, isPending: isCreatePending } = useCreateBlog();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateBlog();
  const { handleSubmit, control, reset } = useForm<TformValues>({
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
          translateHandler({
            title: data?.title as string,
            alt: data?.alt as string,
            description: data?.description as string,
          });
        },
      });
    } else {
      createMutate(createPayload, {
        onSuccess: (response) => {
          queryClient.invalidateQueries({
            queryKey: [blogsRoutes.getAll()],
          });
          responseHandler.success("مقاله با موفقیت ایجاد شد");
          translateIdRef.current = response?.data?.data?.id;
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
              label="نام مقاله"
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
          name="alt"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
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
              message: "alt is required!",
            },
          }}
        />
      </div>
      <div>
        <Controller
          control={control}
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
          name="pictureId"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <CustomImageLoader
                aspect={610 / 352}
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
          color={blog ? "warning" : "success"}
          isLoading={isCreatePending || isUpdatePending}
          type="submit"
        >
          {blog ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
