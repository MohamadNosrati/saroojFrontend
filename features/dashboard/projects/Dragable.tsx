// import React, { useRef, useState } from "react";
// import {
//   verticalListSortingStrategy,
//   arrayMove,
//   SortableContext,
// } from "@dnd-kit/sortable";

// import BeforeAfterItem from "./BeforeAfterItem";
// import { ImageItem } from "@/lib/types/project";
// import {
//   Control,
//   UseFieldArrayRemove,
//   UseFieldArrayUpdate,
//   UseFormSetValue,
// } from "react-hook-form";
// import { TformValues } from "./ProjectsFormContainer";
// import {
//   DndContext,
//   closestCenter,
//   DragEndEvent,
//   DragOverEvent,
// } from "@dnd-kit/core";
// import { DragStartEvent } from "@react-types/shared";

// interface IProps {
//   fields: ImageItem[];
//   remove: UseFieldArrayRemove;
//   update: UseFieldArrayUpdate<TformValues, "images">;
//   control: Control<TformValues, any, TformValues>;
//   setValue: UseFormSetValue<TformValues>;
// }

// export default function Dragable({
//   fields,
//   remove,
//   update,
//   control,
//   setValue,
// }: IProps) {
//   const handleDragStart = (event: DragStartEvent) => {
//     console.log("Drag started:", event);
//   };

//   const handleDragOver = (event: DragOverEvent) => {
//     console.log("Dragging over:", event.over?.id);
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     console.log("this is end")
//     const { active, over } = event;

//     console.log("ondragEnd", { activeId: active.id, overId: over?.id });

//     if (!over) return;
//     if (active.id === over.id) return;

//     // Find indices using the actual string IDs
//     const oldIndex = fields.findIndex((item) => item.id === active.id);
//     const newIndex = fields.findIndex((item) => item.id === over.id);

//     console.log("Indices:", { oldIndex, newIndex });

//     if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
//       // Reorder the fields array
//       const reorderedFields = arrayMove(fields, oldIndex, newIndex);

//       // Update the form state with the new order
//       setValue("images", reorderedFields);

//       console.log(
//         "Updated order:",
//         reorderedFields.map((f) => f.id),
//       );
//     }
//   };

//   //   const handleDragEnd = (event: DragEndEvent) => {
//   //     const { active, over } = event;

//   //     console.log("ondragEnd");

//   //     if (!over) return;

//   //     const oldIndex = active.id as number;
//   //     const newIndex = over.id as number;

//   //     console.log("inHere");

//   //     if (oldIndex !== newIndex) {
//   //       // Reorder the fields array
//   //       const reorderedFields = arrayMove(fields, oldIndex, newIndex);

//   //       // Update the form state with the new order
//   //       setValue("images", reorderedFields);
//   //     }
//   //   };

//   console.log(
//     "ids",
//     fields.map((elem) => elem?.id),
//   );

//   return (
//     <DndContext
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//       onDragOver={handleDragOver}
//     >
//       <SortableContext
//         items={fields.map((elem) => elem?.id)} // Use indices as stable IDs
//         strategy={verticalListSortingStrategy}
//       >
//         <div className="flex flex-col gap-10">
//           {fields?.map((item, index) => (
//             <BeforeAfterItem
//               setValue={setValue}
//               control={control}
//               remove={remove}
//               index={index}
//               update={update}
//               key={item?.id}
//               item={item}
//             />
//           ))}
//         </div>
//       </SortableContext>
//     </DndContext>
//   );
// }

import React from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import BeforeAfterItem from "./BeforeAfterItem";
import { ImageItem } from "@/lib/types/project";
import {
  Control,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormSetValue,
} from "react-hook-form";
import { TformValues } from "./ProjectsFormContainer";

interface IProps {
  fields: ImageItem[];
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<TformValues, "images">;
  control: Control<TformValues, any, TformValues>;
  setValue: UseFormSetValue<TformValues>;
}

export default function Dragable({
  fields,
  remove,
  update,
  control,
  setValue,
}: IProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Minimum distance to start dragging
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const oldIndex = fields.findIndex((item) => item.id === active.id);
    const newIndex = fields.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      const reorderedFields = arrayMove(fields, oldIndex, newIndex);
      setValue("images", reorderedFields);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={fields.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-10">
          {fields.map((item, index) => (
            <BeforeAfterItem
              setValue={setValue}
              control={control}
              remove={remove}
              index={index}
              update={update}
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}