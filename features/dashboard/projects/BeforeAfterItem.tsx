import CustomImageLoader from "@/components/ui/CustomImageLoader";
import {
  Control,
  Controller,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormSetValue,
} from "react-hook-form";
import { TformValues } from "./ProjectsFormContainer";
import { ImageItem, ImageItemPayload } from "@/lib/types/project";
// import CustomInput from "@/components/ui/CustomInput";
import { Button } from "@heroui/button";
import { DeleteIcon } from "@/components/icons";
import { Tooltip } from "@heroui/tooltip";
// import { useSortable } from "@dnd-kit/react/sortable";
// import { useRef } from "react";

interface IProps {
  item: ImageItemPayload;
  update: UseFieldArrayUpdate<TformValues, "images">;
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<TformValues, any, TformValues>;
  setValue: UseFormSetValue<TformValues>;
}

// export default function BeforeAfterItem({
//   item,
//   update,
//   index,
//   remove,
//   control,
// }: IProps) {
//   const handleRef = useRef<HTMLButtonElement | null>(null);
//   const { ref, isDragging } = useSortable({
//     id: item?.id,
//     index,
//     handle: handleRef,
//   });

//   console.log("itemId",item?.id)
//   return (
//     <div
//       data-shadow={isDragging || undefined}
//       ref={ref}
//       className="flex flex-col px-4 py-6 rounded-2xl bg-dark  w-full justify-between gap-4"
//     >
//       <div className="flex justify-between items-center">
//         <Button
//           ref={handleRef}
//           className="text-white  size-10 min-w-10 bg-sky-700 rounded-full flex justify-center items-center"
//         >
//           {index + 1}
//         </Button>
//         <Tooltip color="danger" content="Delete">
//           <Button
//             className="rounded-full size-10 !p-0 min-w-0 !flex !justify-center items-center"
//             onPress={() => remove(index)}
//             color="danger"
//           >
//             <DeleteIcon width={20} height={20} />
//           </Button>
//         </Tooltip>
//       </div>
//       <div className="flex grow justify-between gap-20">
//         <div className="flex-1/2 flex flex-col gap-2.5">
//           <CustomImageLoader
//             label="عکس قبل (اجباری)"
//             htmlFor={`beforeAfterItem-before-${item?.id}-${index}`}
//             value={item?.before?.pictureId}
//             changeImageHandler={(beforImagePictureId) => {
//               update(index, {
//                 ...item,
//                 before: {
//                   ...item?.before,
//                   pictureId: beforImagePictureId,
//                 },
//               });
//             }}
//           />
//           <Controller
//             control={control}
//             name={`images.${index}.before.name`}
//             render={({ field: { value, onChange } }) => (
//               <CustomInput
//                 labelPlacement="outside"
//                 label="نام عکس"
//                 value={value}
//                 onChange={(e) => onChange(e.target?.value)}
//               />
//             )}
//           />
//         </div>
//         <div className="flex-1/2 flex flex-col gap-2.5">
//           <CustomImageLoader
//             label="عکس بعد (اختیاری)"
//             htmlFor={`beforeAfterItem-after-${item?.id}-${index}`}
//             value={item?.after?.pictureId}
//             changeImageHandler={(afterImagePictureId) => {
//               update(index, {
//                 ...item,
//                 after: {
//                   ...item?.after,
//                   pictureId: afterImagePictureId,
//                 },
//               });
//             }}
//           />
//           <Controller
//             control={control}
//             name={`images.${index}.after.name`}
//             render={({ field: { value, onChange } }) => (
//               <CustomInput
//                 labelPlacement="outside"
//                 label="نام عکس"
//                 value={value}
//                 onChange={(e) => onChange(e.target?.value)}
//               />
//             )}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CustomInput from "@/components/ui/CustomInput";
import { CustomWhen } from "@/components/ui/CustomWhen";

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
      style={style}
      className="flex flex-col px-4 py-6 rounded-2xl bg-dark w-full justify-between gap-4"
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
            onPress={() => remove(index)}
            color="danger"
          >
            <DeleteIcon width={20} height={20} />
          </Button>
        </Tooltip>
      </div>
      <div className="flex grow justify-between gap-20">
        <div className="flex-1/2 flex flex-col gap-2.5">
          <Controller
            control={control}
            name={`images.${index}.before.pictureId`}
            rules={{
              required: {
                value: true,
                message: "image upload is required!",
              },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <CustomImageLoader
                  aspect={16 / 9}
                  label="آپلود عکس قبل اجباری"
                  htmlFor={`beforeAfterItem-before-${item?.id}-${index}`}
                  value={value}
                  changeImageHandler={onChange}
                />
                <CustomWhen condition={Boolean(error?.message)}>
                  <p className="mt-0.5 text-sm text-danger">{error?.message}</p>
                </CustomWhen>
              </div>
            )}
          />
          <Controller
            control={control}
            name={`images.${index}.before.name`}
            rules={{
              required: {
                value: true,
                message: "image before name (alt) is required!",
              },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                isInvalid={Boolean(error?.message)}
                errorMessage={error?.message}
                labelPlacement="outside-top"
                label="نام عکس"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className="flex-1/2 flex flex-col gap-2.5">
          <Controller
            control={control}
            name={`images.${index}.after.pictureId`}
            rules={{
              required: {
                value: true,
                message: "image upload is required!",
              },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div>
                <CustomImageLoader
                  aspect={16 / 9}
                  label="آپلود عکس بعد (اختیاری)"
                  htmlFor={`beforeAfterItem-after-${item?.id}-${index}`}
                  value={value}
                  changeImageHandler={onChange}
                />
                <CustomWhen condition={Boolean(error?.message)}>
                  <p className="mt-0.5 text-sm text-danger">{error?.message}</p>
                </CustomWhen>
              </div>
            )}
          />
          <Controller
            control={control}
            name={`images.${index}.after.name`}
            rules={{
              required: {
                value: true,
                message: "image after name (alt) is required!",
              },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                isInvalid={Boolean(error?.message)}
                errorMessage={error?.message}
                labelPlacement="outside-top"
                label="نام عکس"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
