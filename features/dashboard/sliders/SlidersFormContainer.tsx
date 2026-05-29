"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/constants/isActive";
import { useQueryClient } from "@tanstack/react-query";
import { responseHandler } from "@/lib/tools/responseHandler";
import { ISlider } from "@/lib/types/slider";
import { useCreateSlider, useUpdateSlider } from "@/lib/hooks/sliders";
import { sliderRoutes } from "@/lib/routes/apiRoutes";

interface IFormContainerProps {
  slider?: ISlider;
  onOpenChage: () => void;
}

type TformValues = {
  title: string;
  pictureId: string;
  link: string;
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
      },
      values: {
        title: slider?.title || "",
        description: slider?.description || "",
        pictureId: slider?.pictureId?.id || "",
        alt: slider?.alt || "",
        isActive: slider?.isActive === false ? "0" : "1",
        link: slider?.link || "",
      },
    });
  const { pictureId } = watch();
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
              label="عنوان اسلایدر"
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
              message: "link is required!",
            },
          }}
          name="link"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="لینک جزییات"
            />
          )}
        />
      </div>
      <div>
        <CustomImageLoader
          
          htmlFor={"sliderMainImage"}
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
        <Button
          className="font-bold"
          isLoading={isCreatePending || isUpdatePending}
          fullWidth
          type="submit"
          color={slider ? "warning" : "success"}
        >
          {slider ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
