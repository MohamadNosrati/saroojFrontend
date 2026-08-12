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
  ImageArItemPayload,
  ImageEnItemPayload,
  IProject,
  ITranslatedProjectPayload,
  ITranslatedStepItemPayload,
} from "@/lib/types/project";
import { CustomWhen } from "@/components/ui/CustomWhen";

import TranslateArStepItem from "./TranslateArStepItem";
import TranslateArBfItem from "./TranslateArBfItem";
import TranslateEnStepItem from "./TranslateEnStepItem";
import TranslateEnBfItem from "./TranslateEnBfItem";

interface IFormContainerProps {
  traslatedProjectPayload?: ITranslatedProjectPayload;
  onOpenChangeTranslator: () => void;
  isPending: boolean;
  editId: string;
  translateIdRef: MutableRefObject<string | undefined>;
  setEditId: Dispatch<SetStateAction<string | undefined>>;
  project: IProject;
}

export type TformValues = {
  titleEn: string;
  imagesEn: ImageEnItemPayload[];
  altEn: string;
  descriptionEn: string;
  artitectureStyleEn?: string;
  addressEn: string;
  stepsEn: ITranslatedStepItemPayload[];
  titleAr: string;
  imagesAr: ImageArItemPayload[];
  altAr: string;
  descriptionAr: string;
  artitectureStyleAr?: string;
  addressAr: string;
  stepsAr: Partial<ITranslatedStepItemPayload>[];
};

const TranslateProjectFormContainer: React.FC<IFormContainerProps> = ({
  onOpenChangeTranslator,
  traslatedProjectPayload,
  isPending,
  editId,
  translateIdRef,
  setEditId,
  project,
}) => {
  const queryClient = useQueryClient();

  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateProject();

  const { handleSubmit, control } = useForm<TformValues>({
    defaultValues: {
      // English
      titleEn: "",
      descriptionEn: "",
      altEn: "",
      imagesEn: [],
      stepsEn: [],
      addressEn: "",
      artitectureStyleEn: "",

      // Arabic
      titleAr: "",
      descriptionAr: "",
      altAr: "",
      imagesAr: [],
      stepsAr: [],
      addressAr: "",
      artitectureStyleAr: "",
    },

    values: {
      // English
      titleEn: traslatedProjectPayload?.titleEn || "",
      descriptionEn: traslatedProjectPayload?.descriptionEn || "",
      altEn: traslatedProjectPayload?.altEn || "",
      imagesEn: traslatedProjectPayload?.imagesEn || [],
      stepsEn: traslatedProjectPayload?.stepsEn || [],
      addressEn: traslatedProjectPayload?.addressEn || "",
      artitectureStyleEn: traslatedProjectPayload?.artitectureStyleEn || "",

      // Arabic
      titleAr: traslatedProjectPayload?.titleAr || "",
      descriptionAr: traslatedProjectPayload?.descriptionAr || "",
      altAr: traslatedProjectPayload?.altAr || "",
      imagesAr: traslatedProjectPayload?.imagesAr || [],
      stepsAr: traslatedProjectPayload?.stepsAr || [],
      addressAr: traslatedProjectPayload?.addressAr || "",
      artitectureStyleAr: traslatedProjectPayload?.artitectureStyleAr || "",
    },
  });

  const { fields: imagesEnFields } = useFieldArray({
    control,
    name: "imagesEn",
  });
  const { fields: imagesArFields } = useFieldArray({
    control,
    name: "imagesAr",
  });

  const { fields: stepEnFields } = useFieldArray({
    control,
    name: "stepsEn",
  });
  const { fields: stepsArFields } = useFieldArray({
    control,
    name: "stepsAr",
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

        responseHandler.success("پروژه با موفقیت ویرایش ایجاد شد");

        translateIdRef.current = "";
        onOpenChangeTranslator();
        setEditId(undefined);
      },
    });
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-y-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isPending ? (
        <div className="flex min-h-48 items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {/* ==================== ENGLISH ==================== */}

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
                  label="English Project Title"
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
                fieldState: { error },
              }) => (
                <CustomTextArea
                  dir="ltr"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="English Project Description"
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
                  label="English Image Alt Text"
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
              name="artitectureStyleEn"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="ltr"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="English Architecture Style"
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
              name="addressEn"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="ltr"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="English Project Address"
                  labelPlacement="outside-top"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          {/* ==================== ARABIC ==================== */}

          <div className="w-full">
            <Controller
              control={control}
              name="titleAr"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="rtl"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="عنوان المشروع بالعربية"
                  labelPlacement="outside-top"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "titleAr is required!",
                },
              }}
            />
          </div>

          <div className="w-full">
            <Controller
              control={control}
              name="descriptionAr"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomTextArea
                  dir="rtl"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="وصف المشروع بالعربية"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "descriptionAr is required!",
                },
              }}
            />
          </div>

          <div className="w-full">
            <Controller
              control={control}
              name="altAr"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="rtl"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="النص البديل للصورة بالعربية"
                  labelPlacement="outside-top"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "altAr is required!",
                },
              }}
            />
          </div>

          <div className="w-full">
            <Controller
              control={control}
              name="artitectureStyleAr"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="rtl"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="نمط العمارة بالعربية"
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
              name="addressAr"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <CustomInput
                  dir="rtl"
                  errorMessage={error?.message}
                  isInvalid={Boolean(error?.message)}
                  label="عنوان المشروع بالعربية"
                  labelPlacement="outside-top"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          {/* ==================== IMAGES & STEPS ==================== */}

          <div className="flex w-full flex-col gap-10">
            <CustomWhen
              condition={Boolean(traslatedProjectPayload?.imagesEn?.length)}
            >
              {project?.images?.map((item, index) => (
                <TranslateEnBfItem
                  key={index}
                  control={control}
                  index={index}
                  item={item}
                />
              ))}
            </CustomWhen>

            <CustomWhen
              condition={Boolean(traslatedProjectPayload?.stepsEn?.length)}
            >
              {project?.steps?.map((item, index) => (
                <TranslateEnStepItem
                  key={index}
                  control={control}
                  index={index}
                  item={item}
                />
              ))}
            </CustomWhen>
          </div>
          <div className="flex w-full flex-col gap-10 mt-6">
            <CustomWhen
              condition={Boolean(traslatedProjectPayload?.imagesAr?.length)}
            >
              {project?.images?.map((item, index) => (
                <TranslateArBfItem
                  key={index}
                  control={control}
                  index={index}
                  item={item}
                />
              ))}
            </CustomWhen>

            <CustomWhen
              condition={Boolean(traslatedProjectPayload?.stepsEn?.length)}
            >
              {project?.steps?.map((item, index) => (
                <TranslateArStepItem
                  key={item?.id || index}
                  control={control}
                  index={index}
                  item={item}
                />
              ))}
            </CustomWhen>
          </div>

          {/* ==================== SUBMIT ==================== */}

          <div className="w-full">
            <Button
              fullWidth
              className="font-bold"
              color="warning"
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
