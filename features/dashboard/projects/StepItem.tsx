import {
  Control,
  Controller,
  UseFieldArrayRemove,
  UseFormSetValue,
} from "react-hook-form";

// import CustomInput from "@/components/ui/CustomInput";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { DeleteIcon } from "@/components/icons";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import CustomInput from "@/components/ui/CustomInput";
import { CustomWhen } from "@/components/ui/CustomWhen";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomSelect from "@/components/ui/CustomSelect";
import { isActiveOptions } from "@/lib/constants/isActive";
import { IStepItemPayload } from "@/lib/types/project";

import { TformValues } from "./ProjectsFormContainer";

interface IProps {
  item: IStepItemPayload;
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<TformValues, any, TformValues>;
  setValue: UseFormSetValue<TformValues>;
}

export default function StepItem({ item, index, remove, control }: IProps) {
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
      <div className="flex-1/2 flex flex-col gap-2.5">
        <Controller
          control={control}
          name={`steps.${index}.name`}
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
          name={`steps.${index}.pictureId`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <CustomImageLoader
                aspect={1}
                changeImageHandler={onChange}
                htmlFor={`steps-${item?.id}-${index}`}
                label="آپلود عکس مرحله"
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
          name={`steps.${index}.alt`}
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
          name={`steps.${index}.video`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              errorMessage={error?.message}
              isInvalid={Boolean(error?.message)}
              label="لینک ویدعو"
              labelPlacement="outside-top"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name={`steps.${index}.description`}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CustomTextArea
              errorMessage={errors?.description?.message}
              isInvalid={Boolean(errors.description)}
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
      </div>
      <div>
        <Controller
          control={control}
          name={`steps.${index}.isActive`}
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
              message: "alt is required!",
            },
          }}
        />
      </div>
    </div>
  );
}
