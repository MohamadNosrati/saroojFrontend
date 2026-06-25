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
import { ITeamate } from "@/lib/types/teamate";
import { useCreateTeamate, useUpdateTeamate } from "@/lib/hooks/temates";
import { TeamatesRoute } from "@/lib/routes/apiRoutes";
import { CustomWhen } from "@/components/ui/CustomWhen";

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
  telegram?: string;
  instagram?: string;
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
  const { handleSubmit, control, reset } = useForm<TformValues>({
    defaultValues: {
      title: "",
      pictureId: "",
      description: "",
      isActive: "1",
      alt: "",
      position: "",
      telegram: "",
      instagram: "",
    },
    values: {
      title: teamate?.title || "",
      position: teamate?.position || "",
      description: teamate?.description || "",
      pictureId: teamate?.pictureId?.id || "",
      alt: teamate?.alt || "",
      instagram: teamate?.instagram || "",
      telegram: teamate?.telegram || "",
      isActive: teamate?.isActive === false ? "0" : "1",
    },
  });
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
          name="title"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="نام عضو تیم"
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
          name="position"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="موقعیت عضو تیم"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "position is required!",
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
              label="توضیحات غکس"
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
          name="telegram"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="لینک تلگرام"
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
          name="instagram"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="لینک اینستاگرام"
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
                aspect={1}
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
              message: "alt is required!",
            },
          }}
        />
      </div>
      <div>
        <Button
          fullWidth
          className="font-bold"
          color={teamate ? "warning" : "success"}
          isLoading={isCreatePending || isUpdatePending}
          type="submit"
        >
          {teamate ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
