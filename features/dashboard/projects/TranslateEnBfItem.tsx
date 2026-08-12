import { Control, Controller } from "react-hook-form";
import { Button } from "@heroui/button";
import Image from "next/image";

import { ImageEnItem } from "@/lib/types/project";
import CustomInput from "@/components/ui/CustomInput";
import { uploadUrl } from "@/lib/tools/upload";

import { TformValues } from "./TranslateProjectFormConainer";

interface IProps {
  item: ImageEnItem;
  index: number;
  control: Control<TformValues, any, TformValues>;
}

export default function TranslateEnBfItem({ index, control, item }: IProps) {
  return (
    <div className="flex w-full px-4 py-6 rounded-2xl bg-dark justify-between gap-4">
      <div className="flex justify-between items-center">
        <Button className="text-white size-10 min-w-10 bg-sky-700 rounded-full flex justify-center items-center cursor-grab active:cursor-grabbing">
          {index + 1}
        </Button>
      </div>
      <div className="flex grow justify-between gap-20">
        <div className="flex-1/2 flex gap-2.5">
          <Image
            alt=""
            className="size-20 rounded-full object-cover"
            height={100}
            src={uploadUrl(item?.beforeEn?.pictureIdEn?.image as string)}
            width={100}
          />
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
          <Image
            alt=""
            className="size-20 rounded-full object-cover"
            height={100}
            src={uploadUrl(item?.afterEn?.pictureIdEn?.image as string)}
            width={100}
          />
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
