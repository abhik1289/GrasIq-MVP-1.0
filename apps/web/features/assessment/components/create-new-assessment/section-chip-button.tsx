"use client";

import React from "react";
import { SectionChipButtonProps } from "../../types/create-assessment.type";
import { Settings2, Settings, Plus } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
// import { useCreateAssessmentStore } from "@/store";
import { useSearchParams } from "next/navigation";

function SectionChipButton({
  name,
  id,
  order,
  handleChnageSection,
  handleDoubleTap,
  handleAddSection
}: SectionChipButtonProps) {
  // const { activeSectionId, addSection } = useCreateAssessmentStore();
  const params = useSearchParams();
  const sectionId = params.get("sectionId");
  // const { activeSectionId } = useCreateAssessmentStore();
  //
  const isActive = sectionId === id;


  return (
    <div
      onDoubleClick={() => handleDoubleTap(id)}
      onClick={() => handleChnageSection(id)}
      className={cn(
        "border bg-slate-50 border-slate-50 h-[30px] py-2 px-2 flex items-center justify-between w-[110px] rounded text-[14px] cursor-pointer hover:border-blue-400 transition transform-border delay-75 ease-in-out duration-300",
        isActive && "active_border_color"
      )}
    >
      <span className="">{name && name.length >=9 ? name.slice(0, 7) + "..." : name}</span>
      <div
        onClick={handleAddSection}
        className="pl-2 ml-2 border-l-2 border-slate-100 h-5 flex items-center"
      >
        <Plus className="w-4 h-4 cursor-pointer" />
      </div>
    </div>
  );
}

export default SectionChipButton;
