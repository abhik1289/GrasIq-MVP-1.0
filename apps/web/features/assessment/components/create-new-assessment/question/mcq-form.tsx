import React from "react";
import {
  AuthInput,
  RichText,
  SwitchField,
} from "@/components/inputs/auth-input";
import { Form } from "@workspace/ui/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { mcqSchema } from "@/lib/schema/question.schema";
import { useCreateAssessmentStore } from "@/lib/store/assessment-store/assessment-builder-store";
import McqEditForm from "./mcq-edit-form";
import McqAddForm from "./mcq-add-form";
import { useGetQuestion } from "@/features/assessment/api/use-get-question";
import { useToogleSheet } from "@/lib/store";
// import { useGetQuestion } from "@/features/assessment/hooks/use-get-question";
function McqForm() {
  const { type, toogleOpen } = useToogleSheet();
  const { isEdit, activeQuestionId, activeSectionId, sections } =
    useCreateAssessmentStore();
  // const question = useGetQuestion(sections, activeSectionId, activeQuestionId);
  const question = useGetQuestion(activeQuestionId);
  const form = useForm<z.infer<typeof mcqSchema>>({
    resolver: zodResolver(mcqSchema) as any,
    defaultValues: {
      title: "",
      type: "MCQ",
      options: [{ isCorrect: false, text: "" }],
    },
  });
  const onSubmit = (value: z.infer<typeof mcqSchema>) => {
    console.log(value);
  };

  if(question.isLoading) return <div>Loading...</div>;

  const questionData = question.data.question;
console.log(questionData)
  return (
    <>
      <SheetHeader>
        <SheetTitle>{isEdit ? "Edit Question" : "Add Question"}</SheetTitle>
        <SheetDescription>
          {isEdit
            ? "Modify the MCQ details including options and correct answers."
            : "Create a new MCQ by entering the question and answer choices."}
        </SheetDescription>
      </SheetHeader>
      {isEdit && activeQuestionId ? (
        <McqEditForm
        questionId={activeQuestionId}
          defaultValues={{
          title: questionData.McqDetail.title,
            type: "MCQ",
            options: questionData.McqDetail.Options,
          }}
        />
      ) : (
        <McqAddForm
          defaultValues={{
            title: "",
            type: "MCQ",
            options: [],
          }}
        />
      )}
    </>
  );
}

export default McqForm;
