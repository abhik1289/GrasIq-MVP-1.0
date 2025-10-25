"use client";

import React from "react";
import CreateNewAssessmentHeader from "./create-new-assessment/create-new-assessment-header";
import AssessmentMain from "./create-new-assessment/assessment-main";
import BottomController from "./create-new-assessment/bottom-controller";
import InvitationSheet from "./create-new-assessment/assessment-sheet";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  Active,
  Over,
} from "@dnd-kit/core";
import AssessmentSheet from "./create-new-assessment/assessment-sheet";
import { SectionFormDialog } from "@/components/section-dialog/section-dialog";
import { useSectionDialog } from "@/lib/store/sheet-store";
// import { DialogDemo } from "@/components/section-dialog/section-dialog";
function CreateNewAssessmentPage() {
  const handleDragStart = () => {};
  const handleDragEnd = () => {};

  // const [showDialog, setShowDialog] = React.useState(false);
  // const [showDialog, setShowDialog] = React.useState(false);
  const { open, toogleDialog } = useSectionDialog();

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <CreateNewAssessmentHeader />
      <AssessmentSheet />
      <AssessmentMain />
      <SectionFormDialog show={open} setShow={toogleDialog} />
      <BottomController />
    </DndContext>
  );
}

export default CreateNewAssessmentPage;
