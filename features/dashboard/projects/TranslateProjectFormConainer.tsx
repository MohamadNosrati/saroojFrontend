"use client";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@heroui/spinner";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useUpdateProject } from "@/lib/hooks/projects";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import {
  ImageEnItemPayload,
  ITranslatedProjectPayload,
  ITranslatedStepItemPayload,
} from "@/lib/types/project";
import { CustomWhen } from "@/components/ui/CustomWhen";

import TranslateBfItem from "./TranslateBfItem";
import TranslateStepItem from "./TranslateStepItem";

interface IFormContainerProps {
  traslatedProjectPayload?: ITranslatedProjectPayload;
  onOpenChangeTranslator: () => void;
  isPending: boolean;
  editId: string;
  translateIdRef: MutableRefObject<string | undefined>;
  setEditId: Dispatch<SetStateAction<string | undefined>>;
}

export type TformValues = {
  titleEn: string;
  imagesEn: ImageEnItemPayload[];
  altEn: string;
  descriptionEn: string;
  artitectureStyleEn?: string;
  addressEn: string;
  stepsEn: ITranslatedStepItemPayload[];
  videoEn?: string;
};

const TranslateProjectFormContainer: React.FC<IFormContainerProps> = ({
  onOpenChangeTranslator,
  traslatedProjectPayload,
  isPending,
  editId,
  translateIdRef,
  setEditId,
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateProject();
  const { handleSubmit, control } = useForm<TformValues>({
    defaultValues: {
      titleEn: "",
      descriptionEn: "",
      altEn: "",
      imagesEn: [],
      stepsEn: [],
      addressEn: "",
      artitectureStyleEn: "",
      videoEn: "",
    },
    values: {
      titleEn: traslatedProjectPayload?.titleEn || "",
      descriptionEn: traslatedProjectPayload?.descriptionEn || "",
      altEn: traslatedProjectPayload?.altEn || "",
      imagesEn: traslatedProjectPayload?.imagesEn || [],
      stepsEn: traslatedProjectPayload?.stepsEn || [],
      artitectureStyleEn: traslatedProjectPayload?.artitectureStyleEn || "",
      addressEn: traslatedProjectPayload?.addressEn || "",
      videoEn: traslatedProjectPayload?.videoEn || "",
    },
  });

  const { fields: imagesFields } = useFieldArray({
    control: control,
    name: "imagesEn",
  });
  const { fields: stepFields } = useFieldArray({
    control: control,
    name: "stepsEn",
  });

  const onSubmit = async (data: TformValues) => {
    const updatePayload = {
      ...data,
      id: translateIdRef?.current || (editId as string),
    };

    updateMutate(updatePayload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ProjectsRoute.getAll()],
        });
        queryClient.invalidateQueries({
          queryKey: [ProjectsRoute.findOne(editId as string)],
        });
        responseHandler.success("پروژه  با موفقیت ویرایش ایجاد شد");
        translateIdRef.current = "";
        onOpenChangeTranslator();
        setEditId(undefined);
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-y-10 items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isPending ? (
        <div className="flex items-center justify-center min-h-48">
          <Spinner size="lg" />
        </div>
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
                  label="عنوان پروژه"
                  labelPlacement="outside-top"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "titleEn is required!",
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
            <Controller
              control={control}
              name="videoEn"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="ltr"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="ویدیو امگلیسی"
                  labelPlacement="outside-top"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="w-full">
            <Controller
              control={control}
              name="artitectureStyleEn"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="ltr"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="معماری انکلیسی"
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
          <div className="flex w-full flex-col gap-10">
            <CustomWhen
              condition={Boolean(traslatedProjectPayload?.imagesEn?.length)}
            >
              {imagesFields.map((item, index) => (
                <TranslateBfItem
                  key={item.id}
                  control={control}
                  index={index}
                  item={item}
                />
              ))}
            </CustomWhen>
            <CustomWhen
              condition={Boolean(traslatedProjectPayload?.stepsEn?.length)}
            >
              {stepFields.map((item, index) => (
                <TranslateStepItem
                  key={item.id}
                  control={control}
                  index={index}
                  item={item}
                />
              ))}
            </CustomWhen>
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

export default TranslateProjectFormContainer;
