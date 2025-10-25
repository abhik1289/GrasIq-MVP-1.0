import { ISection } from "@/features/assessment/types/section.types";
import React from "react";
import { Clock, HelpCircle, Move, Trash, Trophy } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type SectionListProps = ISection & {
  index: number;
  handleDelete: (id: string) => void;
};

function SectionList({
  id,
  _count,
  durationInMin,
  name,
  totalMarks,
  index,
  handleDelete,
}: SectionListProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // padding: "10px",
    // marginBottom: "5px",
    // background: "#f1f5f9",
    // borderRadius: "8px",
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full my-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:border-slate-300 relative"
    >
      <div className="top flex justify-between">
        <div className="left">
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
            {name}
          </h3>
        </div>
        <div className="right flex gap-2">
          <div className="w-[30px] h-[30px] flex items-center justify-center bg-slate-100 text-slate-600 rounded-full cursor-pointer hover:bg-slate-200 transition">
            <Move className="w-5 h-5" />
          </div>
          <div
            onClick={() => handleDelete(id)}
            className="w-[30px] h-[30px] flex items-center justify-center bg-red-100 text-red-600 rounded-full cursor-pointer hover:bg-red-200 transition"
          >
            <Trash className="w-5 h-5" />
          </div>
        </div>
        {/* Section Title */}
      </div>

      {/* Highlight Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center rounded-lg bg-blue-50 p-3">
          <Clock className="h-5 w-5 text-blue-600" />
          <span className="mt-1 text-sm font-medium text-slate-700">
            {durationInMin} mins
          </span>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-emerald-50 p-3">
          <HelpCircle className="h-5 w-5 text-emerald-600" />
          <span className="mt-1 text-sm font-medium text-slate-700">
            {_count.Question} Qs
          </span>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-amber-50 p-3">
          <Trophy className="h-5 w-5 text-amber-600" />
          <span className="mt-1 text-sm font-medium text-slate-700">
            {totalMarks} Marks
          </span>
        </div>
      </div>
    </div>
  );
}

export default SectionList;
