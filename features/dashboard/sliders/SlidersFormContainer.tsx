"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/constants/isActive";
import { responseHandler } from "@/lib/tools/responseHandler";
import { ISlider } from "@/lib/types/slider";
import { useCreateSlider, useUpdateSlider } from "@/lib/hooks/sliders";
import { sliderRoutes } from "@/lib/routes/apiRoutes";
import { CustomWhen } from "@/components/ui/CustomWhen";

interface IFormContainerProps {
  slider?: ISlider;
  onOpenChage: () => void;
}

type TformValues = {
  title: string;
  pictureId: string;
  mobilePictureId: string;
  link?: string;
  alt: string;
  description: string;
  isActive: "0" | "1";
};

const FormContainer: React.FC<IFormContainerProps> = ({
  slider,
  onOpenChage,
}) => {
  const queryClient = useQueryClient();
  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateSlider();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateSlider();
  const { handleSubmit, setValue, watch, control, reset } =
    useForm<TformValues>({
      defaultValues: {
        title: "",
        pictureId: "",
        description: "",
        isActive: "1",
        alt: "",
        link: "",
        mobilePictureId: "",
      },
      values: {
        title: slider?.title || "",
        description: slider?.description || "",
        pictureId: slider?.pictureId?.id || "",
        alt: slider?.alt || "",
        isActive: slider?.isActive === false ? "0" : "1",
        link: slider?.link || "",
        mobilePictureId: slider?.mobilePictureId?.id || "",
      },
    });
  const onSubmit = async (data: TformValues) => {
    const createPayload = {
      ...data,
      isActive: data?.isActive === "1" ? true : false,
    };
    const updatePayload = {
      ...createPayload,
      id: slider?.id as string,
    };

    if (slider) {
      updateMutate(updatePayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [sliderRoutes.getAll()],
          });
          queryClient.invalidateQueries({
            queryKey: [sliderRoutes.findOne(slider?.id)],
          });
          responseHandler.success("اسلایدر  با موفقیت ویرایش ایجاد شد");
          onOpenChage();
        },
      });
    } else {
      createMutate(createPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [sliderRoutes.getAll()],
          });
          responseHandler.success("اسلایدر با موفقیت ایجاد شد");
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
              label="عنوان اسلایدر"
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
              value={value}
              onChange={onChange}
            />
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
          name="link"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="لینک جزییات"
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
          name="pictureId"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <CustomImageLoader
                aspect={1440 / 670}
                changeImageHandler={onChange}
                htmlFor="sliderImage"
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
          name="mobilePictureId"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <CustomImageLoader
                aspect={360 / 414}
                changeImageHandler={onChange}
                htmlFor="sliderMobileImage"
                label="آپلود عکس موبایل"
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
              message: "mobilePictureId is required!",
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
              message: "alt is required!",
            },
          }}
        />
      </div>
      <div>
        <Button
          fullWidth
          className="font-bold"
          color={slider ? "warning" : "success"}
          isLoading={isCreatePending || isUpdatePending}
          type="submit"
        >
          {slider ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
