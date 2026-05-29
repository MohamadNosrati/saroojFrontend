"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/constants/isActive";
import { useQueryClient } from "@tanstack/react-query";
import { responseHandler } from "@/lib/tools/responseHandler";
import { ImageItem, ImageItemPayload, IProject } from "@/lib/types/project";
import { useCreateProject, useUpdateProject } from "@/lib/hooks/projects";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import Dragable from "./Dragable";
import { useRef } from "react";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { divider } from "@heroui/theme";

interface IFormContainerProps {
  project?: IProject;
  onOpenChage: () => void;
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

const FormContainer: React.FC<IFormContainerProps> = ({
  project,
  onOpenChage,
}) => {
  const queryClient = useQueryClient();
  const datePickerRef = useRef<any>(null);
  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateProject();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateProject();
  const { handleSubmit, setValue, watch, control, reset, formState } =
    useForm<TformValues>({
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
  console.log("fields", fields);
  const { pictureId, images } = watch();
  console.log("imagessss", images);
  const onSubmit = async (data: TformValues) => {
    const createPayload = {
      ...data,
      images: data?.images?.map((item) => ({
        before: item?.before,
        after: item?.after,
      })),
      categoryId: "6a15ecfe2e5844c080bdd73a",
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

  console.log("pictureId");

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
              label="نام پروژه"
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
            min: {
              value: 1,
              message: "min value is 1",
            },
          }}
          name="description"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CustomTextArea
              min={1}
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
              onFocus={() => datePickerRef.current?.openCalendar()}
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
              message: "address is required!",
            },
          }}
          name="address"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="آدرس"
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
          name="artitectureStyle"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="استایل معماری"
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
              message: "area is required!",
            },
          }}
          name="area"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              step={10}
              type="number"
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
              value={String(value)}
              onChange={onChange}
              labelPlacement="outside-top"
              label="مساحت"
            />
          )}
        />
      </div>
      <div className="w-full">
        <label htmlFor="startDate">تاریخ شروع</label>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "alt is required!",
            },
          }}
          name="startDate"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePicker
              id="startDate"
              containerClassName="w-full"
              className="w-full"
              required={true}
              locale={persian_fa}
              calendar={persian}
              calendarPosition="top-left"
              inputClass="w-full bg-white mt-1 h-10 rounded-xl text-dark p-2.5 font-bold"
              value={value}
              onChange={onChange}
              zIndex={10000000}
            />
          )}
        />
      </div>
      <div className="w-full">
        <label htmlFor="endDate">تاریخ پایان</label>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "endDate is required!",
            },
          }}
          name="endDate"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePicker
              id="endDate"
              containerClassName="w-full"
              className="w-full"
              required={true}
              locale={persian_fa}
              calendar={persian}
              calendarPosition="top-left"
              inputClass="w-full bg-white mt-1 h-10 rounded-xl text-dark p-2.5 font-bold"
              value={value}
              onChange={onChange}
              zIndex={10000000}
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
                aspect={1}
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
          name={"isActive"}
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomSelect
              selectLabel="وضعیت"
              options={isActiveOptions}
              onSelectionChange={onChange}
              value={value}
            />
          )}
        />
      </div>
      <div >
        <p className="text-white font-bold text-center">عکس های مربوط به قبل و بعد پروژه را وارد کنید.</p>
      </div>
      <div className="flex flex-col gap-10">
        <Dragable
          setValue={setValue}
          control={control}
          fields={fields}
          remove={remove}
          update={update}
        />
        <div>
          <Button
            fullWidth
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
            color="primary"
          >
            افزودن عکس{" "}
          </Button>
        </div>
      </div>
      <div>
        <Button
          className="font-bold"
          isLoading={isCreatePending || isUpdatePending}
          fullWidth
          type="submit"
          color={project ? "warning" : "success"}
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
        value={String(value)}
        onChange={onChange}
        labelPlacement="outside-top"
        fullWidth
        label=" تاریخ پایان"
        className="w-full"
      />
    </div>
  );
};
