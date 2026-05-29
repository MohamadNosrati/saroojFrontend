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
import { ITeamate } from "@/lib/types/teamate";
import { useCreateTeamate, useUpdateTeamate } from "@/lib/hooks/temates";
import { TeamatesRoute } from "@/lib/routes/apiRoutes";

interface IFormContainerProps {
  teamate?: ITeamate;
  onOpenChage: () => void;
}

type TformValues = {
  title: string;
  description: string;
  pictureId: string;
  isActive: "0" | "1";
  alt: string;
  position: string;
};

const FormContainer: React.FC<IFormContainerProps> = ({
  teamate,
  onOpenChage,
}) => {
  const queryClient = useQueryClient();
  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateTeamate();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateTeamate();
  const { handleSubmit, setValue, watch, control, reset } =
    useForm<TformValues>({
      defaultValues: {
        title: "",
        pictureId: "",
        description: "",
        isActive: "1",
        alt: "",
        position: "",
      },
      values: {
        title: teamate?.title || "",
        position: teamate?.position || "",
        description: teamate?.description || "",
        pictureId: teamate?.pictureId?.id || "",
        alt: teamate?.alt || "",
        isActive: teamate?.isActive === false ? "0" : "1",
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
      id: teamate?.id as string,
    };
    if (teamate) {
      updateMutate(updatePayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TeamatesRoute.getAll()],
          });
          responseHandler.success("عصو تیم با موفقیت ایجاد شد");
          onOpenChage();
        },
      });
    } else {
      createMutate(createPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TeamatesRoute.getAll()],
          });
          responseHandler.success("عصو تیم با موفقیت ایجاد شد");
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
              label="نام عضو تیم"
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
              message: "position is required!",
            },
          }}
          name="position"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="موقعیت عضو تیم"
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
              label="توضیحات غکس"
            />
          )}
        />
      </div>
      <div>
        <CustomImageLoader
          aspect={1}
          htmlFor="teamateMainImage"
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
          color={teamate ? "warning" : "success"}
        >
          {teamate ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
