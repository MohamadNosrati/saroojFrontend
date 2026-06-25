"use client";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@heroui/button";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import { notificationRoutes } from "@/lib/routes/apiRoutes";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useCreateNotification } from "@/lib/hooks/notications";

interface IFormContainerProps {
  onOpenChage: () => void;
}

type TformValues = {
  title: string;
  description: string;
  url: string;
};

const FormContainer: React.FC<IFormContainerProps> = ({ onOpenChage }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateNotification();
  const { handleSubmit, setValue, watch, control, reset } =
    useForm<TformValues>({
      defaultValues: {
        title: "",
        url: "",
        description: "",
      },
    });
  const onSubmit = async (data: TformValues) => {
    const createPayload = {
      ...data,
    };

    mutate(createPayload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [notificationRoutes.getAll()],
        });
        responseHandler.success("نوتفیکیشن با موفقیت ایجاد شد");
        reset();
      },
    });
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
              label="عنوان"
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
          name="url"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              dir="ltr"
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="لینک"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "url is required!",
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
        <Button
          fullWidth
          className="font-bold"
          color={"success"}
          isLoading={isPending}
          type="submit"
        >
          {"ارسال"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
