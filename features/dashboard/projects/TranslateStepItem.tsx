import { Control, Controller } from "react-hook-form";
import { Button } from "@heroui/button";

import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import { ITranslatedStepItemPayload } from "@/lib/types/project";

import { TformValues } from "./TranslateProjectFormConainer";

interface IProps {
  item: ITranslatedStepItemPayload;
  index: number;
  control: Control<TformValues, any, TformValues>;
}

export default function TranslateStepItem({ item, index, control }: IProps) {
  return (
    <div className="flex flex-col px-4 py-6 rounded-2xl bg-dark w-full justify-between gap-4">
      <div className="flex justify-between items-center">
        <Button className="text-white size-10 min-w-10 bg-sky-700 rounded-full flex justify-center items-center cursor-grab active:cursor-grabbing">
          {index + 1}
        </Button>
      </div>
      <div className="flex-1/2 flex flex-col gap-2.5">
        <Controller
          control={control}
          name={`stepsEn.${index}.nameEn`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="نام مرحله"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "step name is required!",
            },
          }}
        />
        <Controller
          control={control}
          name={`stepsEn.${index}.altEn`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="توضیح عکس"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "step image alt is required!",
            },
          }}
        />
        <Controller
          control={control}
          name={`stepsEn.${index}.descriptionEn`}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CustomTextArea
              errorMessage={errors?.descriptionEn?.message}
              isInvalid={Boolean(errors.descriptionEn)}
              label={"توضیحات مرحله"}
              min={1}
              value={value}
              onChange={onChange}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "description is required!",
            },
            min: {
              value: 1,
              message: "min value is 1",
            },
          }}
        />
        <Controller
          control={control}
          name={`stepsEn.${index}.videoEn`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="ویدیو مرحله"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
