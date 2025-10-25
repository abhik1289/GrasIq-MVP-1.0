"use client";

import React from "react";

import { useSearchParams } from "next/navigation";
import { useGetSection } from "@/features/assessment/api/use-get-section";
import SectionEditForm from "./section-edit-form";
import { SectionType } from "@/lib/schema/section.schema";
// import { UseCreateAssessmentStore } from "@/store";

// Schema

export interface ISection {
  id: string;
  name: string;
  description: string;
  order: number;
  durationInMin: number | null;
  totalMarks: number | null;
  isStar: boolean;
  examId: string;
  questionSerialNo: "A" | "a" | "Number" | "Roman";
  optionSerialNo: "A" | "a";
  isSkipable: boolean;
  negativeMarks: boolean;
  // totalQuestions?: number;
}

function SectionForm() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sectionId");
  const section = useGetSection(sectionId || "");

  // console.log(sectionInfo.name);

  if (section.isLoading) return <div>Loading...</div>;
  if (section.isError) return <div>Error</div>;
  const sectionInfo: ISection = section.data.section;
  console.log(sectionInfo);
  return (
    <>
      {/* <SheetHeader> */}
      {/* <SheetTitle>Edit Section</SheetTitle> */}
      {/* <SheetDescription>
       Provide section name, description, and duration to structure the session.
        </SheetDescription> */}
      <SectionEditForm
        sectionId={sectionId || ""}
        defaultValues={{
          // sectionType: "",
          sectionType: "" as SectionType,
          name: sectionInfo.name,
          description: sectionInfo.description,
          duration: sectionInfo.durationInMin?.toString() || "",
          isSkipable: sectionInfo.isStar,
          totalMarks: sectionInfo.totalMarks?.toString() || "",
          isStar: sectionInfo.isStar,
          negativeMarks: sectionInfo.negativeMarks,
          optionSerialNo: sectionInfo.optionSerialNo,
          questionSerialNo: sectionInfo.questionSerialNo,
          // sectionType: "",
        }}
      />
      {/* </SheetHeader> */}
    </>
  );
}

export default SectionForm;
