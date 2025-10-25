import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Plus,
  FileText,
  Calendar,
  User,
  MoreVertical,
  Grid3X3,
  SortAsc,
  Filter,
  Clock,
  Edit,
  Copy,
  Trash2,
  Share,
  Loader2,
} from "lucide-react";
// import { useCreateExam } from "../api/use-update-or-create-exam";
import { useGetExam } from "../api/use-get-exam";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { ExamTableSkeletonRow } from "./exam-table-skeleton-row ";
import ExamTableRow from "./exam-table-row";

export type ExamTypes = {
  id: string;
  name: string;
  type: "ASSESSMENT" | "Exam";
  isSetupComplete: boolean;
  createdAt: string;
  updatedAt: string;
  examId: string;
};

const getExams = async () => {
  const res = await fetch("/api/exam");
  return res.json();
};

function ExamListView() {
  // const [exams, setExams] = useState<Exam[]>(mockExams);
  const [examType, setExamType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const router = useRouter();
  useEffect(() => {
    getExams();
  }, []);

  // const filteredAndSortedExams = exams
  //   .filter(
  //     (exam) => examType === "all" || exam.type.toLowerCase() === examType
  //   )
  //   .sort((a, b) => {
  //     switch (sortBy) {
  //       case "name":
  //         return a.name.localeCompare(b.name);
  //       case "date":
  //         return (
  //           new Date(b.lastModified).getTime() -
  //           new Date(a.lastModified).getTime()
  //         );
  //       case "created":
  //         return (
  //           new Date(b.createdDate).getTime() -
  //           new Date(a.createdDate).getTime()
  //         );
  //       default:
  //         return 0;
  //     }
  //   });

  //   const examMutation = useCreateExam();
  const {
    isLoading: examLoading,
    data: examData,
    isError,
    error,
  } = useGetExam();

  // console.log(examData.exam
  const examListBody = () => {
    if (examLoading) {
      return (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <ExamTableSkeletonRow key={i} />
          ))}
        </>
      );
    }
    if (isError) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center text-red-500">
            Error loading exams: {error?.message || "Unknown error"}
          </TableCell>
        </TableRow>
      );
    }

    const examList: ExamTypes[] = examData.exam || [];
    console.log(examList)
    if (examList.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center text-gray-500">
            No exams found.
          </TableCell>
        </TableRow>
      );
    }

    const handleTap = (id: string) => {
      // "use server";

      router.push(`/assessment-builder/new?type=edit&examId=${id}`);
    };

    return (
      <>
        {examList.map((exam) => (
          <ExamTableRow
            onTap={()=>handleTap(exam.id)}
            id={exam.id}
            key={exam.id}
            examId={exam.examId}
            createdAt={exam.createdAt}
            name={exam.name}
            isSetupComplete={exam.isSetupComplete}
            type={exam.type}
            updatedAt={exam.updatedAt}
            onDelete={() => {}}
            onDuplicate={() => {}}
            onEdit={() => {}}
          />
        ))}
      </>
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header Controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Exam Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">
                  <div className="flex items-center">
                    <SortAsc className="w-4 h-4 mr-2" />
                    A-Z
                  </div>
                </SelectItem>
                <SelectItem value="date">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last Modified
                  </div>
                </SelectItem>
                <SelectItem value="created">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Created Date
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <Filter className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table View */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-700">
                  Exam Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Type
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Created Date
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Last Modified
                </TableHead>

                <TableHead className="font-semibold text-gray-700">
                  Status
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{examListBody()}</TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ExamListView;
