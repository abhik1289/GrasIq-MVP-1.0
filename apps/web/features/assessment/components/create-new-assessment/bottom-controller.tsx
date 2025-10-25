"use client";

import { Card } from "@workspace/ui/components/card";
// import { useCreateAssessmentStore } from "@/store/assessment-store/assessment-builder-store";
import React, { useEffect } from "react";
import SectionChipButton from "./section-chip-button";
import { ChevronLeft, ListCheck, Plus, SquareChevronLeft } from "lucide-react";
import { useGetSections } from "../../api/use-get-sections";
import { useRouter, useSearchParams } from "next/navigation";
import SectionSkeleton from "./section-chip-button-skeleton";
import { useToogleSheet } from "@/lib/store";
import { useCreateSection } from "../../api/use-create-section";
import { useBodyScrollLock } from "@/hooks/use-scrollbar-lock";
import { useSectionDialog } from "@/lib/store/sheet-store";

function BottomController() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useSearchParams();
  const examId = params.get("examId");
  const sections = useGetSections(params.get("examId") || "");
  const addSection = useCreateSection();
  const sectionId = params.get("sectionId");
  const { toogleOpen } = useToogleSheet();
  const { open, toogleDialog } = useSectionDialog();

  const handleChnageSection = (sectionId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sectionId", sectionId);

    router.push(`/assessment-builder/new?${params.toString()}`);
  };

  useEffect(() => {
    if (sections.data && sections.data.sections.length > 0) {
      if (!sectionId) {
        handleChnageSection(sections.data.sections[0].id);
      }
    }
  }, [sections.data]);

  const handleDoubleClick = (sectionId: string) => {
    // toogleOpen("SECTION");
    toogleDialog();
    // useBodyScrollLock(true);
  };

  function buttonChips() {
    if (sections.isLoading)
      return Array.from({ length: 5 }).map((_, i) => (
        <SectionSkeleton key={i} />
      ));

    return sections.data.sections.map((section: any, i: number) => (
      <SectionChipButton
        key={section.id}
        handleAddSection={() => addSection.mutate({ examId: examId || "" })}
        name={section.name}
        id={section.id}
        handleDoubleTap={() => handleDoubleClick(section.id)}
        order={section.order}
        handleChnageSection={() => handleChnageSection(section.id)}
      />
    ));
  }

  return (
    <Card className="rounded-none border-0 flex justify-between flex-wrap flex-row fixed w-full bottom-0 left-0 h-[45px] items-center px-6 py-1 ">
      <div className="left flex gap-5">
        <div className="controll_panel flex gap-2.5 items-center">
          <Plus className="cursor-pointer" />
          <ListCheck />
        </div>
        <div className="section_wrapper flex gap-1">{buttonChips()}</div>
      </div>
      <div onClick={() => toogleOpen("SECTION_LIST")} className="right">
        <SquareChevronLeft className="text-slate-900/75" />
      </div>
    </Card>
  );
}

export default BottomController;
