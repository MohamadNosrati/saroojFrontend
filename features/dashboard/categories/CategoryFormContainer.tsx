"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useState } from "react";
import { Button } from "@heroui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { categoryServices } from "@/lib/services/categories";
import { ICategory } from "@/lib/types/categories";

interface IFormContainerProps {
  category?: ICategory;
}

type TformValues = {
  title: string;
  description: string;
  pictureId: string;
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

const FormContainer: React.FC<IFormContainerProps> = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, setValue, watch, control, reset } =
    useForm<TformValues>({
      defaultValues: {
        title: "",
        pictureId: "",
        description: "",
        isActive: "1",
      },
      values: {
        title: category?.title || "",
        description: category?.description || "",
        pictureId: category?.pictureId.id || "",
        isActive: !category ? "1" : category?.isActive === true ? "1" : "0",
      },
    });
  const { pictureId } = watch();
  const onSubmit = async (data: TformValues) => {
    let res;
    const payload = {
      ...data,
      isActive: data?.isActive === "1" ? true : false,
    };
    try {
      setLoading(true);
      if (category) {
        res = await categoryServices.update(category?.id, payload);
      } else {
        res = await categoryServices.create(payload);
      }
      responseHandler.success(res.data?.message);
      if (!category) {
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
          name="title"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="نام دسته بندی"
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <CustomTextArea value={value} onChange={onChange} />
          )}
        />
      </div>
      <div>
        <CustomImageLoader
          value={pictureId}
          setValue={(value: string) => setValue("pictureId", value)}
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
          {category ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
