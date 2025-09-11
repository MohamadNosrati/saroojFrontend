"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import { Controller, useForm } from "react-hook-form";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useState } from "react";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { commentServices } from "@/lib/services/comments";

interface IFormContainerProps {
  comment?: IComment;
}

type TformValues = {
  fullName: string;
  text: string;
  email: string;
  isActive: "0" | "1";
};

const options = [
  {
    label: "غیر فعال",
    key: "0",
  },
  {
    label: "قعال",
    key: "1",
  },
];

const FormContainer: React.FC<IFormContainerProps> = ({ comment }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, setValue, watch, control, reset } =
    useForm<TformValues>({
      defaultValues: {
        fullName: "",
        text:"",
        email:"",
        isActive: "1",
      },
      values: {
        fullName: comment?.fullName || "",
        text: comment?.text || "",
        email: comment?.email || "",
        isActive: !comment ? "1" : comment?.isActive === true ? "1" : "0",
      },
    });
  const onSubmit = async (data: TformValues) => {
    let res;
    const payload = {
      ...data,
      isActive: data?.isActive === "1" ? true : false,
    };
    try {
      setLoading(true);
      if (comment) {
        res = await commentServices.update(comment?.id, payload);
      } else {
        res = await commentServices.create(payload);
      }
      responseHandler.success(res.data?.message);
      if (!comment) {
        reset();
      }
    } catch (err) {
      responseHandler.fail(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-col gap-y-10" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="نام کاربر"
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="text"
          render={({ field: { value, onChange } }) => (
            <CustomTextArea value={value} onChange={onChange} />
          )}
        />
      </div>
      <div>
        <CustomSelect
          selectLabel="وضعیت"
          options={options}
          control={control}
          name="isActive"
        />
      </div>
      <div>
        <Button isLoading={loading} fullWidth type="submit" color="primary">
          {comment ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
