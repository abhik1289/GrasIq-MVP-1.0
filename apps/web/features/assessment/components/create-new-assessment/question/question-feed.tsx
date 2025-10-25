"use client";

import React from "react";
import { useCreateAssessmentStore } from "@/lib/store/assessment-store/assessment-builder-store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useGetSerialCode from "@/features/assessment/hooks/use-get-serial-code";
import { SortableQuestionItem } from "./sortable-question-item";
import { useSearchParams } from "next/navigation";
import { useGetQuestions } from "@/features/assessment/api/use-get-questions";
import { Button } from "@workspace/ui/components/button";
import { QuestionSkeleton } from "./question-skeleton";
import { useToogleSheet } from "@/lib/store";
// import { SortableQuestionItem } from "./sortable-question-item";

function QuestionFeed() {
  const { sections, activeSectionId, updateSection, setEdit } =
    useCreateAssessmentStore();
  const currentSection = sections.find(
    (item) => item.section_id === activeSectionId
  );

  // const

  const params = useSearchParams();
  const examId = params.get("examId");
  const sectionId = params.get("sectionId");
  console.log(examId, sectionId);

  if (!currentSection) return null;

  const questions = useGetQuestions(examId, sectionId);

  // console.log(questions.data.questions);
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = currentSection.questions.findIndex(
      (q) => q.questionId === active.id
    );
    const newIndex = currentSection.questions.findIndex(
      (q) => q.questionId === over.id
    );

    const newQuestions = arrayMove(
      currentSection.questions,
      oldIndex,
      newIndex
    );

    updateSection(currentSection.section_id, {
      questions: newQuestions,
    });
  };

  // const {
  //   activeSectionId,
  //   activeQuestionId,
  //   setActiveQuestionId,
  //   setEdit,
  //   removeQuestion,
  // } = useCreateAssessmentStore();
  const { toogleOpen } = useToogleSheet();
  function handleQuestionFeedState() {
    if (questions.isLoading) return <>
    {
      Array.from({ length: 2 }).map((_, i) => (
        <QuestionSkeleton key={i} />
      ))
    }
    </>;
    if (questions.isError) return <div>Error</div>;
    if (questions.data.questions.length === 0)
      return (
        <div className="flex items-center justify-center h-[150px]">
          <Button
            onClick={() => {
              setEdit(false);
              toogleOpen("QUESTION", "MCQ");
            }}
          >
            Add Question
          </Button>
        </div>
      );
    return questions.data.questions.map((question, i) => (
      <SortableQuestionItem
        key={question.id}
        id={question.id}
        serialCode={useGetSerialCode(question.questionSerialNo, i)}
        optionSerailCode={"A"}
        options={question.McqDetail.Options}
        questionId={question.id}
        title={question.McqDetail.title}
        isLast={true}
      />
    ));
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={currentSection.questions.map((q) => q.questionId)}
        strategy={verticalListSortingStrategy}
      >
        <div className="mb-10 w-full">
          {handleQuestionFeedState()}
          {/* {} */}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default QuestionFeed;
