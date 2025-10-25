import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { TableCell, TableRow } from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Copy,
  Edit,
  FileText,
  MoreVertical,
  Share,
  Trash2,
} from "lucide-react";
import { ExamTypes } from "./exam-list-view";

type ExamTableRowControllers = {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onTap: (id: string) => void;
};

type ExamRowProps = ExamTypes & ExamTableRowControllers;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusColor = (completed: boolean) => {
  if (completed) {
    return "bg-green-100 text-green-800 hover:bg-green-100";
  } else {
    return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
  }
};

const ExamTableRow: React.FC<ExamRowProps> = ({
  id,
  name,
  createdAt,
  isSetupComplete,
  type,
  updatedAt,
  onDelete,
  onDuplicate,
  onTap,
  onEdit,
  examId,
}) => {
  return (
    <TableRow
      onClick={() => onTap(examId)}
      key={id}
      className="hover:bg-gray-50 cursor-pointer"
    >
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-gray-900">{name}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs">
          {type}
        </Badge>
      </TableCell>
      <TableCell className="text-gray-600">{formatDate(createdAt)}</TableCell>
      <TableCell className="text-gray-600">{formatDate(updatedAt)}</TableCell>
      <TableCell>
        <Badge className={getStatusColor(isSetupComplete)}>
          {isSetupComplete ? "Published" : "Draft"}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(id)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(id)}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default ExamTableRow;
