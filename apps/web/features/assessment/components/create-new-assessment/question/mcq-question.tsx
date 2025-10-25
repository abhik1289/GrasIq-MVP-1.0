import React, { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { AlertDialogBox } from "@/components/alert-dialog/alert-dialog";
import { useCreateAssessmentStore, useToogleSheet } from "@/lib/store";
// import { IOptions } from "@/store/assessment-store/assessment.types";
import { Move, Pencil, Plus, Trash } from "lucide-react";
import useGetSerialCode from "@/features/assessment/hooks/use-get-serial-code";
import OptionItem from "./option-item";
import { McqQuestionProps } from "@/features/assessment/types/question.types";
import { useDeleteQuestion } from "@/features/assessment/api/use-delete-questions";
import { toast } from "sonner";

function McqQuestion({
  questionId,
  title,
  options,
  serialCode,
  optionSerailCode,
  isLast,
  dragHandleProps,
}: McqQuestionProps) {
  console.log("Rendering McqQuestion:", optionSerailCode);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<string | null>(null);
  const {
    activeSectionId,
    activeQuestionId,
    setActiveQuestionId,
    setEdit,
    removeQuestion,
  } = useCreateAssessmentStore();
  const { toogleOpen } = useToogleSheet();

  const handleEdit = (questionId: string) => {
    setActiveQuestionId(questionId);
    setEdit(true);
    toogleOpen("QUESTION", "MCQ");
  };

  const handleAdd = () => {
    setEdit(false);
    toogleOpen("QUESTION", "MCQ");
  };

  const deleteQna = useDeleteQuestion();

  const handleDelete = (questionId: string) => {
    setDeleteQuestionId(questionId);
    setOpen(true);
  };

  return (
    <div className="relative group bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition mb-6 w-full">
      {/* Glassy Control Panel on Hover */}
      <div
        className="
          absolute top-2 right-2 z-10
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          backdrop-blur-sm bg-white/40 border border-white/30 rounded-lg
          px-1.5 py-1 flex gap-1
        "
      >
        <TooltipProvider>
          {isLast && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleAdd}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add</TooltipContent>
            </Tooltip>
          )}
          {
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-500"
                  onClick={() => handleDelete(questionId)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          }
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 cursor-move"
                {...dragHandleProps}
              >
                <Move className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleEdit(questionId)}
                size="icon"
                variant="ghost"
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Question */}
      <div className="text-base font-semibold mb-3 break-words pr-16">
        <span className="mr-2 ">{serialCode})</span>
        {title}
      </div>

      {/* Options */}
      <RadioGroup className="grid grid-cols-2 gap-3" defaultValue="none">
        {options.map((option, i) => (
          <OptionItem
            index={i}
            optionId={i.toString()}
            optionSerialCode={optionSerailCode}
            key={i}
            optionText={option.text}
          />
        ))}
      </RadioGroup>

      {/* Confirm Delete */}
      <AlertDialogBox
        open={open}
        setOpen={setOpen}
        title="Delete Question"
        description="Are you sure you want to delete this question? This action cannot be undone."
        onCancel={() => {
          setDeleteQuestionId(null);
          setOpen(false);
        }}
        onSuccess={() => {
          if (deleteQuestionId) {
            deleteQna.mutate(deleteQuestionId, {
              onSuccess: () => {
                toast.success("Question deleted successfully");
                // alert("Deleted Successfully");
              },
              onError: (error: any) => {
                toast.error("Question not deleted successfully");
                // alert("Question not deleted successfully");
              },
            });
          }
        }}
      />
    </div>
  );
}

export default McqQuestion;
