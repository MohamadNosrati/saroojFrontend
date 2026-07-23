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
import { Control, UseFieldArrayRemove, UseFormSetValue } from "react-hook-form";

import { IStepItemPayload } from "@/lib/types/project";

import { TformValues } from "./ProjectsFormContainer";
import StepItem from "./StepItem";

interface IProps {
  fields: IStepItemPayload[];
  remove: UseFieldArrayRemove;
  control: Control<TformValues, any, TformValues>;
  setValue: UseFormSetValue<TformValues>;
}

export default function StepDragable({
  fields,
  remove,
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

      setValue(
        "steps",
        reorderedFields?.map((item) => ({
          ...item,
          isActive: item?.isActive === true ? "1" : ("0" as any),
        })),
      );
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map((item) => item.id as string)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-10">
          {fields.map((item, index) => (
            <StepItem
              key={item.id}
              control={control}
              index={index}
              item={item}
              remove={remove}
              setValue={setValue}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
