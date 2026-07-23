import { Control, Controller } from "react-hook-form";
import { Button } from "@heroui/button";

import { ImageEnItemPayload } from "@/lib/types/project";
import CustomInput from "@/components/ui/CustomInput";

import { TformValues } from "./TranslateProjectFormConainer";

interface IProps {
  item: ImageEnItemPayload;
  index: number;
  control: Control<TformValues, any, TformValues>;
}

export default function TranslateBfItem({ index, control }: IProps) {
  return (
    <div className="flex w-full flex-col px-4 py-6 rounded-2xl bg-dark justify-between gap-4">
      <div className="flex justify-between items-center">
        <Button className="text-white size-10 min-w-10 bg-sky-700 rounded-full flex justify-center items-center cursor-grab active:cursor-grabbing">
          {index + 1}
        </Button>
      </div>
      <div className="flex grow justify-between gap-20">
        <div className="flex-1/2 flex gap-2.5">
          <Controller
            control={control}
            name={`imagesEn.${index}.beforeEn.nameEn`}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                errorMessage={error?.message}
                isInvalid={Boolean(error?.message)}
                label="نام عکس"
                labelPlacement="outside-top"
                value={value}
                onChange={onChange}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "image before name (alt) is required!",
              },
            }}
          />
        </div>
        <div className="flex-1/2 flex gap-2.5">
          <Controller
            control={control}
            name={`imagesEn.${index}.afterEn.nameEn`}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                errorMessage={error?.message}
                isInvalid={Boolean(error?.message)}
                label="نام عکس"
                labelPlacement="outside-top"
                value={value}
                onChange={onChange}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "image after name (alt) is required!",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
