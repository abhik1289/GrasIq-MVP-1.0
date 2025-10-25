import { TableCell, TableRow } from "@workspace/ui/components/table";
import { IInviteWithRole } from "../types/admin.types";
import {
  Calendar,
  Clock,
  Mail,
  Pencil,
  Shield,
  Trash2,
  XCircle,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { getInvitePersonStatus } from "@/lib/getInvitePersonStatus";
import { refactorDate } from "@/lib/refactorDate";
import { getRole, roleColors } from "@/lib/administration-helper";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  expired: "bg-red-100 text-red-800 border-red-200",
};

export const InviteRow = ({
  invite,
  onResend,
  onCancel,
  onEdit,
  isLoading,
}: {
  invite: IInviteWithRole;
  onResend: (email: string) => void;
  onCancel: (email: string) => void;
  onEdit: (invite: string) => void;
  isLoading: boolean;
}) => {
  const { status, message } = getInvitePersonStatus(invite.expiredAt);

  return (
    <TableRow key={invite.id}>
      <TableCell>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          {invite.email}
        </div>
      </TableCell>

      <TableCell>
        <Badge className={roleColors[invite.role.name]} variant="outline">
          <Shield className="h-3 w-3 mr-1" />
          {getRole(invite.role.name)}
        </Badge>
      </TableCell>

      <TableCell>{invite.firstName}</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {refactorDate(invite.createdAt)}
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="outline" className={statusColors[status]}>
          {status === "expired" ? (
            <XCircle className="h-3 w-3 mr-1" />
          ) : (
            <Clock className="h-3 w-3 mr-1" />
          )}
          {status.toUpperCase()}
        </Badge>
      </TableCell>

      <TableCell>
        <span
          className={
            status === "expired" ? "text-red-600" : "text-muted-foreground"
          }
        >
          {message}
        </span>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading}
                variant="outline"
                size="sm"
                onClick={() => onResend(invite.id)}
              >
                <Clock className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Resend Invitation</TooltipContent>
          </Tooltip>

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading}
                variant="outline"
                size="sm"
                onClick={() => onEdit(invite.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Invitation</TooltipContent>
          </Tooltip> */}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading}
                variant="outline"
                size="sm"
                onClick={() => onCancel(invite.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Cancel Invitation</TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
};
