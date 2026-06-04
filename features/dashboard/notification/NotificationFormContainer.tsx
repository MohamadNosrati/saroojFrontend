"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { notificationRoutes } from "@/lib/routes/apiRoutes";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useCreateNotification } from "@/lib/hooks/notications";
import { Button } from "@heroui/button";

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
              label="عنوان"
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
              message: "url is required!",
            },
          }}
          name="url"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="لینک"
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
        <Button
          className="font-bold"
          isLoading={isPending}
          fullWidth
          type="submit"
          color={"success"}
        >
          {"ارسال"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
