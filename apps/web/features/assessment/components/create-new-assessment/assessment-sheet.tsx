"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";

import { useToogleSheet } from "@/lib/store";
import SectionForm from "./section/section-form";
import { ITYPE } from "@/lib/store/sheet-store";
import QuestionForm from "./question/mcq-form";
import McqForm from "./question/mcq-form";
import SectionListView from "./section/section-list-view";
// import InvitationForm from "./invitation-form";
function AssessmentSheet() {
  const { open, toogleOpen, side, type, questionType } = useToogleSheet();

  const getSheetForm = (
    type: ITYPE,
    questionType?: "MCQ" | "CODING" | "READING" | "WRITTING"
  ) => {
    switch (type) {
      case "SECTION_LIST":
        return <SectionListView />;
      case "QUESTION":
        switch (questionType) {
          case "MCQ":
            return <McqForm />;
        }
    }
  };

  return (
    <Sheet open={open} onOpenChange={() => toogleOpen("QUESTION")}>
      <SheetContent 
      style={{
        scrollbarWidth: 'none'
      }}
      className="overflow-y-auto  py-2.5" side={"right"}>
        {getSheetForm(type, questionType)}
      </SheetContent>
    </Sheet>
  );
}

export default AssessmentSheet;
