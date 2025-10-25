"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useCreateAssessmentStore, useToogleSheet } from "@/lib/store";
import {
  Eye,
  FileText,
  Loader2,
  Settings,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { useUpdateOrCreateExam } from "../../api/use-update-or-create-exam";
import { useAction } from "next-safe-action/hooks";
import { upsertExam } from "@/lib/actions/exam/exam";

type SaveStatus = "idle" | "saving" | "saved" | "error";

function CreateNewAssessmentHeader() {
  // const [examTitle, setExamTitle] = useState("Assessment 1");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const { toogleOpen } = useToogleSheet();
  const { assessment_id, name, setExamName } = useCreateAssessmentStore();

  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleExamTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamName(assessment_id, e.target.value);
    // setSaveStatus("saving");

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      saveExamTitle(e.target.value);
    }, 1000);
  };

  const updateExam = useUpdateOrCreateExam();

  const { execute } = useAction(upsertExam);

  const saveExamTitle = async (title: string) => {
    execute({ examId: assessment_id, name: title });
  };

  const renderSaveStatus = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <div className="flex items-center gap-1 text-yellow-600 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </div>
        );
      case "saved":
        return (
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Saved
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            Error saving
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <header className="flex justify-between items-center px-4 py-3 border-b border-slate-300 bg-white">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-blue-600" />
        <Input
          value={name}
          onChange={handleExamTitleChange}
          className="text-lg font-semibold border-0 px-2 py-1 focus-visible:ring-0 focus-visible:ring-offset-0 w-[300px] bg-transparent"
          placeholder="Untitled Assessment"
        />
        {renderSaveStatus()}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="hover:bg-slate-100"
          aria-label="Preview"
        >
          <Eye className="w-5 h-5 mr-1" />
          Preview
        </Button>

        <Button
          variant="ghost"
          className="hover:bg-slate-100"
          aria-label="Settings"
          // onClick={() => toogleOpen("right")}
        >
          <Settings className="w-5 h-5 mr-1" />
          Settings
        </Button>

        <Button className="bg-blue-700 text-white hover:bg-blue-800">
          Publish
        </Button>
      </div>
    </header>
  );
}

export default CreateNewAssessmentHeader;
