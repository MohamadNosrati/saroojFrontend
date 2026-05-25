"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/config/isActive";
import { useQueryClient } from "@tanstack/react-query";
import { responseHandler } from "@/lib/tools/responseHandler";
import { ImageItem, IProject } from "@/lib/types/project";
import { useCreateProject, useUpdateProject } from "@/lib/hooks/projects";
import { ProjectsRoute } from "@/lib/routes/apiRoutes";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import Dragable from "./Dragable";

interface IFormContainerProps {
  project?: IProject;
  onOpenChage: () => void;
}

export type TformValues = {
  title: string;
  categoryId: string;
  pictureId: string;
  images: ImageItem[];
  alt: string;
  area: number;
  startDate: number;
  endDate?: number;
  description: string;
  isActive: "0" | "1";
  artitectureStyle:string;
};

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
        endDate: 0,
        startDate: 0,
        images: [],
        artitectureStyle:"",
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
        images: project?.images || [],
        endDate: project?.endDate || 0,
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
      categoryId: "6a0f500544a58423b6f26ffb",
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
              inputMode=""
              containerClassName="w-full"
              className="w-full"
              // render={()=><CustomInput/>}
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
      <div className="w-full">
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "alt is required!",
            },
          }}
          name="endDate"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePicker
              inputMode=""
              containerClassName="w-full"
              className="w-full"
              // render={()=><CustomInput/>}
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
          htmlFor="projectMainImage"
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
        <p>عکس های مربوط به قبل و بعد پروژه را وارد کنید.</p>
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
