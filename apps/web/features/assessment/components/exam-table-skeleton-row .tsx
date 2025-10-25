import { TableCell, TableRow } from "@workspace/ui/components/table";

export const ExamTableSkeletonRow = () => {
  return (
    <TableRow className="animate-pulse">
      <TableCell>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </TableCell>

      <TableCell>
        <div className="h-4 bg-gray-200 rounded w-20" />
      </TableCell>

      <TableCell>
        <div className="h-4 bg-gray-200 rounded w-24" />
      </TableCell>

      <TableCell>
        <div className="h-4 bg-gray-200 rounded w-24" />
      </TableCell>

      <TableCell>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      </TableCell>

      <TableCell>
        <div className="h-6 w-20 rounded bg-gray-200" />
      </TableCell>

      <TableCell>
        <div className="w-8 h-8 bg-gray-200 rounded" />
      </TableCell>
    </TableRow>
  );
};
