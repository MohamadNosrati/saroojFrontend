"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/constants/isActive";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useCreateComment, useUpdateComment } from "@/lib/hooks/comments";
import { CommentsRoute } from "@/lib/routes/apiRoutes";
import { typeOptions } from "@/lib/constants/type";

interface IFormContainerProps {
  comment?: IComment;
  onOpenChage: () => void;
}

type TformValues = {
  fullName: string;
  isActive: "0" | "1";
  email: string;
  text: string;
  type: "persian" | "english";
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
        type: "persian",
      },
      values: {
        fullName: comment?.fullName || "",
        text: comment?.text || "",
        email: comment?.email || "",
        isActive: comment?.isActive === false ? "0" : "1",
        type: comment?.type || "persian",
      },
    });

  const type = watch("type");
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
          queryClient.invalidateQueries({
            queryKey: [CommentsRoute.findOne(comment?.id)],
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
          name={"type"}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomSelect
              error={error?.message}
              options={typeOptions}
              selectLabel="نوع"
              value={value}
              onSelectionChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "type is required!",
            },
          }}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              dir={type === "persian" ? "rtl" : "ltr"}
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="نام و نام خانوادگی"
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
          name="email"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CustomInput
              dir="ltr"
              errorMessage={errors?.email?.message}
              isInvalid={Boolean(errors?.email)}
              label="ایمیل"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "email is required!",
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
              message: "status is required!",
            },
          }}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="text"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CustomTextArea
              dir={type === "persian" ? "rtl" : "ltr"}
              errorMessage={errors?.text?.message}
              isInvalid={Boolean(errors?.text)}
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "text is required!",
            },
          }}
        />
      </div>
      <div>
        <Button
          fullWidth
          className="font-bold"
          color={comment ? "warning" : "success"}
          isLoading={isCreatePending || isUpdatePending}
          type="submit"
        >
          {comment ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
