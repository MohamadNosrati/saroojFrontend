import CustomImageLoader from "@/components/ui/CustomImageLoader";

import {
  Control,
  Controller,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormSetValue,
} from "react-hook-form";

import { TformValues } from "./ProjectsFormContainer";

import { ImageItemPayload } from "@/lib/types/project";

// import CustomInput from "@/components/ui/CustomInput";
import { Button } from "@heroui/button";

import { DeleteIcon } from "@/components/icons";

import { Tooltip } from "@heroui/tooltip";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CustomInput from "@/components/ui/CustomInput";
import { CustomWhen } from "@/components/ui/CustomWhen";

interface IProps {
  item: ImageItemPayload;
  update: UseFieldArrayUpdate<TformValues, "images">;
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<TformValues, any, TformValues>;
  setValue: UseFormSetValue<TformValues>;
}

export default function BeforeAfterItem({
  item,
  update,
  index,
  remove,
  control,
}: IProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id as string });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col px-4 py-6 rounded-2xl bg-dark w-full justify-between gap-4"
      style={style}
    >
      <div className="flex justify-between items-center">
        <Button
          {...attributes}
          {...listeners}
          className="text-white size-10 min-w-10 bg-sky-700 rounded-full flex justify-center items-center cursor-grab active:cursor-grabbing"
        >
          {index + 1}
        </Button>
        <Tooltip color="danger" content="Delete">
          <Button
            className="rounded-full size-10 !p-0 min-w-0 !flex !justify-center items-center"
            color="danger"
            onPress={() => remove(index)}
          >
            <DeleteIcon height={20} width={20} />
          </Button>
        </Tooltip>
      </div>
      <div className="flex grow justify-between gap-20">
        <div className="flex-1/2 flex flex-col gap-2.5">
          <Controller
            control={control}
            name={`images.${index}.before.pictureId`}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <CustomImageLoader
                  aspect={16 / 9}
                  changeImageHandler={onChange}
                  htmlFor={`beforeAfterItem-before-${item?.id}-${index}`}
                  label="آپلود عکس قبل اجباری"
                  value={value}
                />
                <CustomWhen condition={Boolean(error?.message)}>
                  <p className="mt-0.5 text-sm text-danger">{error?.message}</p>
                </CustomWhen>
              </div>
            )}
            rules={{
              required: {
                value: true,
                message: "image upload is required!",
              },
            }}
          />
          <Controller
            control={control}
            name={`images.${index}.before.name`}
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
        <div className="flex-1/2 flex flex-col gap-2.5">
          <Controller
            control={control}
            name={`images.${index}.after.pictureId`}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <CustomImageLoader
                  aspect={16 / 9}
                  changeImageHandler={onChange}
                  htmlFor={`beforeAfterItem-after-${item?.id}-${index}`}
                  label="آپلود عکس بعد (اختیاری)"
                  value={value}
                />
                <CustomWhen condition={Boolean(error?.message)}>
                  <p className="mt-0.5 text-sm text-danger">{error?.message}</p>
                </CustomWhen>
              </div>
            )}
            rules={{
              required: {
                value: true,
                message: "image upload is required!",
              },
            }}
          />
          <Controller
            control={control}
            name={`images.${index}.after.name`}
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
