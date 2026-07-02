"use client";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { useEffect, useRef, useState } from "react";
import { RadioGroup, Radio } from "@heroui/radio";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/constants/isActive";
import { responseHandler } from "@/lib/tools/responseHandler";
import {
  ImageItemPayload,
  IProject,
  IProjectType,
  IStePItemPayload,
} from "@/lib/types/project";
import { useCreateProject, useUpdateProject } from "@/lib/hooks/projects";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { useGetCategories } from "@/lib/hooks/categories";

import BfDragable from "./BFDragable";
import StepDragable from "./StepDragable";

interface IFormContainerProps {
  project?: IProject;
}

export type TformValues = {
  title: string;
  categoryId: string;
  pictureId: string;
  images: ImageItemPayload[];
  alt: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  isActive: "0" | "1";
  artitectureStyle?: string;
  address: string;
  video?: string;
  steps: IStePItemPayload[];
};

const FormContainer: React.FC<IFormContainerProps> = ({ project }) => {
  const queryClient = useQueryClient();
  const datePickerRef = useRef<any>(null);
  const [projectType, setProjectType] = useState<IProjectType>(
    IProjectType.BeforeAfter,
  );
  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateProject();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateProject();
  const { data, isLoading } = useGetCategories();
  const { handleSubmit, setValue, control, reset } = useForm<TformValues>({
    defaultValues: {
      title: "",
      pictureId: "",
      description: "",
      isActive: "1",
      alt: "",
      area: 0,
      categoryId: "",
      endDate: 0,
      startDate: 0,
      images: [],
      artitectureStyle: "",
      address: "",
      video: "",
      steps: [],
    },
    values: {
      title: project?.title || "",
      description: project?.description || "",
      pictureId: project?.pictureId?.id || "",
      alt: project?.alt || "",
      artitectureStyle: project?.artitectureStyle || "",
      isActive: project?.isActive === false ? "0" : "1",
      area: project?.area || 0,
      startDate: project?.startDate || 0,
      categoryId: project?.categoryId?.id || "",
      steps:
        project?.steps?.map((item) => ({
          ...item,
          isActive: item?.isActive === false ? "0" : "1",
          pictureId: item?.pictureId?.id,
        })) || [],
      video: project?.video || "",
      images:
        project?.images?.map((item) => ({
          after: {
            name: item?.after?.name,
            pictureId: item?.after?.pictureId?.id,
          },
          before: {
            name: item?.before?.name,
            pictureId: item?.before?.pictureId?.id,
          },
        })) || [],
      endDate: project?.endDate || 0,
      address: project?.address || "",
    },
  });

  const {
    append: appendImages,
    fields: imagesFields,
    update: updateImages,
    remove: removeImages,
  } = useFieldArray({
    control: control,
    name: "images",
  });
  const {
    append: appendSteps,
    fields: stepFields,
    remove: removeSteps,
  } = useFieldArray({
    control: control,
    name: "steps",
  });
  const onSubmit = async (data: TformValues) => {
    const createPayload = {
      ...data,
      images:
        projectType === IProjectType?.BeforeAfter
          ? data?.images?.map((item) => ({
              before: item?.before,
              after: item?.after,
            }))
          : [],
      startDate: data?.startDate,
      endDate: data?.startDate,
      isActive: data?.isActive === "1" ? true : false,
      steps:
        projectType === IProjectType?.Steps
          ? data?.steps?.map((item) => ({
              name: item?.name,
              alt: item?.alt,
              description: item?.description,
              video: item?.video,
              pictureId: item?.pictureId,
              isActive: item?.isActive === "1" ? true : false,
            }))
          : [],
    };
    const updatePayload = {
      ...createPayload,
      id: project?.id as string,
    };

    if (project) {
      updateMutate(updatePayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [ProjectsRoute.getAll()],
          });
          queryClient.invalidateQueries({
            queryKey: [ProjectsRoute.findOne(updatePayload?.id)],
          });
          responseHandler.success("پروژه با موفقیت ویرایش شد");
        },
      });
    } else {
      createMutate(createPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [ProjectsRoute.getAll()],
          });
          responseHandler.success("پروژه با موفقیت ایجاد شد");
          reset();
        },
      });
    }
  };

  useEffect(() => {
    if (project?.steps?.length) {
      setProjectType(IProjectType.Steps);
    }
  }, [project]);

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
              label="نام پروژه"
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
              min={1}
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "description is required!",
            },
            min: {
              value: 1,
              message: "min value is 1",
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
              onFocus={() => datePickerRef.current?.openCalendar()}
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
          name="video"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="لینک ویدعو آپارات"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
              onFocus={() => datePickerRef.current?.openCalendar()}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="address"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="آدرس"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "address is required!",
            },
          }}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="artitectureStyle"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="استایل معماری"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="area"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="مساحت"
              labelPlacement="outside-top"
              step={10}
              type="number"
              value={String(value)}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "area is required!",
            },
          }}
        />
      </div>
      <div className="w-full">
        <label className="text-white font-bold" htmlFor="startDate">
          تاریخ شروع
        </label>
        <Controller
          control={control}
          name="startDate"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePicker
              calendar={persian}
              calendarPosition="top-left"
              className="w-full"
              containerClassName="w-full"
              id="startDate"
              inputClass="w-full bg-white mt-1 h-10 rounded-xl text-dark p-2.5 font-bold"
              locale={persian_fa}
              value={value}
              zIndex={10000000}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "start date is required!",
            },
          }}
        />
      </div>
      <div className="w-full">
        <label className="text-white font-bold" htmlFor="endDate">
          تاریخ پایان
        </label>
        <Controller
          control={control}
          name="endDate"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePicker
              calendar={persian}
              calendarPosition="top-left"
              className="w-full"
              containerClassName="w-full"
              id="endDate"
              inputClass="w-full bg-white mt-1 h-10 rounded-xl text-dark p-2.5 font-bold"
              locale={persian_fa}
              value={value}
              zIndex={10000000}
              onChange={onChange}
            />
          )}
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
        <Controller
          control={control}
          name={"categoryId"}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomSelect
              disabled={isLoading}
              error={error?.message}
              options={
                data?.data?.map((item) => ({
                  key: item?.id,
                  label: item?.title,
                })) || []
              }
              selectLabel="دسته بندی"
              value={value}
              onSelectionChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "category is required!",
            },
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-white font-bold">
          نوع نمایش پروژه را انتخاب کنید.
        </span>
        <RadioGroup
          isDisabled={Boolean(project)}
          orientation="horizontal"
          value={projectType}
          onValueChange={(value: any) => setProjectType(value)}
        >
          <Radio value={IProjectType.BeforeAfter}>قبل و بعد</Radio>
          <Radio value={IProjectType.Steps}>مراحل</Radio>
        </RadioGroup>
      </div>
      <CustomWhen condition={projectType === IProjectType.BeforeAfter}>
        <div className="flex flex-col gap-10">
          <BfDragable
            control={control}
            fields={imagesFields}
            remove={removeImages}
            setValue={setValue}
            update={updateImages}
          />
          <div>
            <Button
              fullWidth
              color="primary"
              onPress={() => {
                appendImages({
                  id: crypto.randomUUID(),
                  before: {
                    name: "",
                    pictureId: "",
                  },
                  after: {
                    name: "",
                    pictureId: "",
                  },
                });
              }}
            >
              افزودن عکس قبل و بعد
            </Button>
          </div>
        </div>
      </CustomWhen>
      <CustomWhen condition={projectType === IProjectType.Steps}>
        <div className="flex flex-col gap-10">
          <StepDragable
            control={control}
            fields={stepFields}
            remove={removeSteps}
            setValue={setValue}
          />
          <div>
            <Button
              fullWidth
              color="primary"
              onPress={() => {
                appendSteps({
                  id: crypto.randomUUID(),
                  alt: "",
                  description: "",
                  video: "",
                  isActive: "0",
                  name: "",
                  pictureId: "",
                });
              }}
            >
              افزودن مرحله
            </Button>
          </div>
        </div>
      </CustomWhen>
      <div>
        <Button
          fullWidth
          className="font-bold"
          color={project ? "warning" : "success"}
          isLoading={isCreatePending || isUpdatePending}
          type="submit"
        >
          {project ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
