"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/config/isActive";
import { useQueryClient } from "@tanstack/react-query";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useCreateComment, useUpdateComment } from "@/lib/hooks/comments";
import { CommentsRoute } from "@/lib/routes/apiRoutes";

interface IFormContainerProps {
  comment?: IComment;
  onOpenChage: () => void;
}

type TformValues = {
  fullName: string;
  isActive: "0" | "1";
  email: string;
  text: string;
};

const FormContainer: React.FC<IFormContainerProps> = ({
  comment,
  onOpenChage,
}) => {
  const queryClient = useQueryClient();
  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateComment();
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateComment();
  const { handleSubmit, setValue, watch, control, reset } =
    useForm<TformValues>({
      defaultValues: {
        fullName: "",
        isActive: "1",
        email: "",
        text: "",
      },
      values: {
        fullName: comment?.fullName || "",
        text: comment?.text || "",
        email: comment?.email || "",
        isActive: comment?.isActive === false ? "0" : "1",
      },
    });
  const onSubmit = async (data: TformValues) => {
    const createPayload = {
      ...data,
      isActive: data?.isActive === "1" ? true : false,
    };
    const updatePayload = {
      ...createPayload,
      id: comment?.id as string,
    };
    if (comment) {
      updateMutate(updatePayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [CommentsRoute.getAll()],
          });
          responseHandler.success(" نظر با ویرایش ایجاد شد");
          onOpenChage();
        },
      });
    } else {
      createMutate(createPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [CommentsRoute.getAll()],
          });
          responseHandler.success("نظر با موفقیت ایجاد شد");
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
          name="fullName"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              isInvalid={Boolean(error?.message)}
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="نام و نام خانوادگی"
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
              message: "email is required!",
            },
          }}
          name="email"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CustomInput
              isInvalid={Boolean(errors?.email)}
              errorMessage={errors?.email?.message}
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="ایمیل"
            />
          )}
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
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "text is required!",
            },
          }}
          name="text"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CustomTextArea
              value={value}
              onChange={onChange}
              isInvalid={Boolean(errors?.text)}
              errorMessage={errors?.text?.message}
            />
          )}
        />
      </div>
      <div>
        <Button
          className="font-bold"
          isLoading={isCreatePending || isUpdatePending}
          fullWidth
          type="submit"
          color={comment ? "warning" : "success"}
        >
          {comment ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
