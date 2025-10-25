"use client";

import { Button } from "@workspace/ui/components/button";

import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUpdateOrCreateExam } from "../api/use-update-or-create-exam";
// import { useCreateAssessmentStore } from "@/store/assessment-store/assessment-builder-store";
import ExamListView from "./exam-list-view";
// import { useCreateOrUpdateSection } from "../api/use-update-or-create-section";
import { useAction } from "next-safe-action/hooks";
import { upsertExam } from "@/lib/actions/exam/exam";

import { v4 as uuidv4 } from "uuid";

export default function ExamBuilder() {
  const router = useRouter();
  const uniqueId = uuidv4();
  // const createExam = useUpdateOrCreateExam();
  // const createSection = useCreateOrUpdateSection();

  // const { assessment_id, name, addSection } = useCreateAssessmentStore();

  const { execute, status, hasErrored } = useAction(upsertExam);
  const exam = useUpdateOrCreateExam();
  const handleNewExam = () => {
    exam.mutate(
      { examId: uniqueId, name: "New Exam" },
      {
        onSuccess: (data) => {
          router.push(`/assessment-builder/new?type=new&examId=${data.exam.id}`);
        },
      }
    );
  };

  const isDisabled = status === "executing";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Sidebar - 1/3 */}
        <div className="w-1/3 bg-white border-r border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Exam Builder
              </h1>
              <p className="text-gray-600">
                Create and manage your exams and assessments
              </p>
            </div>

            <Button
              onClick={handleNewExam}
              className="w-full h-12 text-lg"
              size="lg"
              disabled={isDisabled}
            >
              {isDisabled ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Plus className="w-5 h-5 mr-2" />
              )}
              Create New Exam
            </Button>
          </div>
        </div>

        {/* Main Content - 2/3 */}
        <ExamListView />
      </div>
    </div>
  );
}
