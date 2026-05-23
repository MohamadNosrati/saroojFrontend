"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/config/isActive";
import { useQueryClient } from "@tanstack/react-query";
import { responseHandler } from "@/lib/tools/responseHandler";
import { IBFImage, IProject } from "@/lib/types/project";
import { useCreateProject, useUpdateProject } from "@/lib/hooks/projects";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

interface IFormContainerProps {
  project?: IProject;
  onOpenChage: () => void;
}

type TformValues = {
  title: string;
  categoryId: string;
  pictureId: string;
  images: IBFImage[];
  alt: string;
  area: number;
  startDate: Date;
  endDate?: Date;
  description: string;
  isActive: "0" | "1";
};

const date = new Date();

const FormContainer: React.FC<IFormContainerProps> = ({
  project,
  onOpenChage,
}) => {
  const queryClient = useQueryClient();
  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateProject();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateProject();
  const { handleSubmit, setValue, watch, control, reset } =
    useForm<TformValues>({
      defaultValues: {
        title: "",
        pictureId: "",
        description: "",
        isActive: "1",
        alt: "",
        area: 0,
        categoryId: "",
        endDate: date,
        startDate: date,
      },
      values: {
        title: project?.title || "",
        description: project?.description || "",
        pictureId: project?.pictureId?.id || "",
        alt: project?.alt || "",
        isActive: project?.isActive === false ? "0" : "1",
        area: project?.area || 0,
        startDate: project?.startDate || date,
        categoryId: project?.categoryId?.id || "",
        images: project?.images || [],
        endDate: project?.endDate || date,
      },
    });
  const { pictureId } = watch();
  const onSubmit = async (data: TformValues) => {
    const createPayload = {
      ...data,
      startData: data?.startDate.getTime(),
      endDate: data?.startDate.getTime(),
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
          responseHandler.success("پروژه با ویرایش ایجاد شد");
          onOpenChage();
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
              message: "area is required!",
            },
          }}
          name="area"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
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
              containerClassName="w-full"
              className="w-full"
              //   portal={true}\
              required={true}
              locale={persian_fa}
              calendar={persian}
              calendarPosition="top-left"
              inputClass="w-full"
              value={value}
              onChange={onChange}
              zIndex={10000000}
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
