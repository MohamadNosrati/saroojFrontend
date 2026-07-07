"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@heroui/spinner";

import CustomInput from "@/components/ui/CustomInput";
import { responseHandler } from "@/lib/tools/responseHandler";
import { ITranslatedBlogPayload } from "@/lib/types/blog";
import { useUpdateBlog } from "@/lib/hooks/blog";
import { blogsRoutes } from "@/lib/routes/apiRoutes";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { CustomWhen } from "@/components/ui/CustomWhen";

interface IFormContainerProps {
  traslatedBlogPayload?: ITranslatedBlogPayload;
  onOpenChangeTranslator: () => void;
  isPending: boolean;
  editId: string;
}

type TformValues = {
  titleEn: string;
  altEn: string;
  descriptionEn: string;
};

const TranslateBlogFormContainer: React.FC<IFormContainerProps> = ({
  onOpenChangeTranslator,
  traslatedBlogPayload,
  isPending,
  editId,
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateBlog();
  const { handleSubmit, control } = useForm<TformValues>({
    defaultValues: {
      titleEn: "",
      descriptionEn: "",
      altEn: "",
    },
    values: {
      titleEn: traslatedBlogPayload?.titleEn || "",
      descriptionEn: traslatedBlogPayload?.descriptionEn || "",
      altEn: traslatedBlogPayload?.altEn || "",
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
          queryKey: [blogsRoutes.getAll()],
        });
        queryClient.invalidateQueries({
          queryKey: [blogsRoutes.findOne(editId as string)],
        });
        responseHandler.success("مقاله  با موفقیت ویرایش ایجاد شد");
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
                  label="عنوان مقاله"
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
                field: { onChange, value },
                fieldState: { error },
              }) => (
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

export default TranslateBlogFormContainer;
