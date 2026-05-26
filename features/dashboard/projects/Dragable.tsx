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
import { ImageItemPayload } from "@/lib/types/project";
import {
  Control,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormSetValue,
} from "react-hook-form";
import { TformValues } from "./ProjectsFormContainer";

interface IProps {
  fields: ImageItemPayload[];
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
    }),
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
        items={fields.map((item) => item.id as string)}
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
