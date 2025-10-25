"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
// import { McqQuestionProps } from "./mcq-question";
import McqQuestion from "./mcq-question";
import { McqQuestionProps } from "@/features/assessment/types/question.types";

type SortableQuestionItemProps = McqQuestionProps & {
  id: string;
};

export function SortableQuestionItem(props: SortableQuestionItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <McqQuestion
        {...props}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
