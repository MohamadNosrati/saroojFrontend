"use client";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { useRef } from "react";

import Dragable from "./Dragable";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/constants/isActive";
import { responseHandler } from "@/lib/tools/responseHandler";
import { ImageItemPayload, IProject } from "@/lib/types/project";
import { useCreateProject, useUpdateProject } from "@/lib/hooks/projects";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { useGetCategories } from "@/lib/hooks/categories";

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
  artitectureStyle: string;
  address: string;
};

const FormContainer: React.FC<IFormContainerProps> = ({ project }) => {
  const queryClient = useQueryClient();
  const datePickerRef = useRef<any>(null);
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

  const { append, fields, update, remove } = useFieldArray({
    control: control,
    name: "images",
  });
  const onSubmit = async (data: TformValues) => {
    const createPayload = {
      ...data,
      images: data?.images?.map((item) => ({
        before: item?.before,
        after: item?.after,
      })),
      startDate: data?.startDate,
      endDate: data?.startDate,
      isActive: data?.isActive === "1" ? true : false,
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
              required={true}
              value={value}
              zIndex={10000000}
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
              required={true}
              value={value}
              zIndex={10000000}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "endDate is required!",
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
      <div>
        <p className="text-white font-bold text-center">
          عکس های مربوط به قبل و بعد پروژه را وارد کنید.
        </p>
      </div>
      <div className="flex flex-col gap-10">
        <Dragable
          control={control}
          fields={fields}
          remove={remove}
          setValue={setValue}
          update={update}
        />
        <div>
          <Button
            fullWidth
            color="primary"
            onPress={() => {
              append({
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
            افزودن عکس{" "}
          </Button>
        </div>
      </div>
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

interface IProps {
  value: any;
  onChange: any;
}

const CustomDatePickerInput = ({ value, onChange }: IProps) => {
  return (
    <div className="w-full">
      <CustomInput
        fullWidth
        className="w-full"
        label=" تاریخ پایان"
        labelPlacement="outside-top"
        value={String(value)}
        onChange={onChange}
      />
    </div>
  );
};
