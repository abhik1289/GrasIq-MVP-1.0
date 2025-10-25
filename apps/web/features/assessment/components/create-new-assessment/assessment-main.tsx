"use client";

import React, { useEffect } from "react";
import { Card } from "@workspace/ui/components/card";
// import BottomController from "./bottom-controller";
// import { useToogleSheet } from "@/store";
// import { useCreateAssessmentStore } from "@/store/assessment-store/assessment-builder-store";
import { Label } from "@workspace/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import QuestionFeed from "./question/question-feed";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetSections } from "../../api/use-get-sections";
import { Button } from "@workspace/ui/components/button";
import { useCreateSection } from "../../api/use-create-section";
import { ISection } from "../../types/section.types";
import { Loader2 } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
function AssessmentMain() {
  const params = useSearchParams();
  const router = useRouter();
  const addSectionMutation = useCreateSection();

  useEffect(() => {
    const type = params.get("type");
    const examId = params.get("examId");
    const isValidType = type === "edit" || type === "create";
    const isValidExamId = typeof examId === "string" && examId.length >= 5;
    if (!isValidType || !isValidExamId) {
      // router.back();
    }
  }, [params, router]);

  const sections = useGetSections(params.get("examId") || "");

  function handleSectionState() {
    if (sections.isLoading) {
      return (
        <div className="px-4">
          <div className="h-32 flex items-center justify-center border rounded-lg bg-white shadow-sm">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading sections...</span>
          </div>
        </div>
      );
    }
    if (sections.isError) return <h1>Error loading sections</h1>;

    const sectionList: ISection[] = sections.data.sections || [];

    if (sectionList.length === 0) {
      return (
        <>
          <Label className="mb-4">No sections available</Label>
          <Button
            onClick={() => {
              addSectionMutation.mutate({
                examId: params.get("examId") || "",
              });
            }}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Add Section
          </Button>
        </>
      );
    } else {
      return <QuestionFeed />;
    }
  }

  return (
    <div className="py-4 pl-4 overflow-y-auto flex justify-center">
      <Card className="section_workspace w-8/12 p-4 rounded-md hover:border-blue-500 mb-[50px] flex flex-col items-center justify-center">
        {handleSectionState()}
      </Card>
    </div>
  );
}

export default AssessmentMain;
