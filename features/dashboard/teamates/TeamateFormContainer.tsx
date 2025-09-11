"use client";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useState } from "react";
import { Button } from "@heroui/button";
import { temateServices } from "@/lib/services/teamates";
import { ITeamate } from "@/lib/types/teamate";

interface IFormContainerProps {
  teamate?: ITeamate;
}

type TformValues = {
  title: string;
  position: string;
  description: string;
  pictureId: string;
};

const FormContainer: React.FC<IFormContainerProps> = ({ teamate }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, setValue, watch, control, reset } =
    useForm<TformValues>({
      defaultValues: {
        title: "",
        position: "",
        pictureId: "",
        description: "",
      },
      values: {
        title: teamate?.title || "",
        description: teamate?.description || "",
        pictureId: teamate?.pictureId.id || "",
        position: teamate?.position || "",
      },
    });
  const { pictureId } = watch();
  const onSubmit = async (data: TformValues) => {
    let res;
    try {
      setLoading(true);
      if (teamate) {
        res = await temateServices.update(teamate?.id, data);
      } else {
        res = await temateServices.create(data);
      }
      responseHandler.success(res.data?.message);
      if (!teamate) {
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
              label="نام و نام خانوادگی"
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="position"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              value={value}
              onChange={onChange}
              labelPlacement="outside-top"
              label="عنوان شغلی"
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
      <CustomImageLoader
        value={pictureId}
        setValue={(value: string) => setValue("pictureId", value)}
      />
      <div>
        <Button isLoading={loading} fullWidth type="submit" color="primary">
          {teamate ? "ویرایش" : "ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default FormContainer;
