"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Check,
  MoreHorizontal,
  Shield,
  X,
  Copy,
  Eye,
  UserCheck,
  UserX,
  Lock,
  Unlock,
} from "lucide-react";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Badge } from "@workspace/ui/components/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
// import { formatDate } from "@/lib/date-utils"
import { getRole, roleColors } from "@/lib/administration-helper";
import { refactorDate } from "@/lib/refactorDate";
import useToogleBan from "../apis/use-toogle-ban-user";
import useToogleLock from "../apis/use-toogle-lock-user";
import { toast } from "sonner";
import { useInvitationSheet } from "@/lib/store/sheet-store";
// import type { AdminUser } from "@/types/admin"

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const StatusIcon = ({
  isActive,
  activeColor = "text-green-600",
  inactiveColor = "text-red-500",
}:{
  isActive: boolean;
  activeColor?: string;
  inactiveColor?: string;
}) => (
  <div className="flex justify-center">
    {isActive ? (
      <Check className={`w-4 h-4 ${activeColor}`} />
    ) : (
      <X className={`w-4 h-4 ${inactiveColor}`} />
    )}
  </div>
);

export const adminColumns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select all rows"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  //   size: 40,
  // },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "fullName",
    header: "Administrator",
    cell: ({ row }) => {
      const { firstName, lastName, email } = row.original;
      const fullName = `${firstName} ${lastName}`;

      return (
        <div className="flex items-center gap-3 min-w-[200px]">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt={fullName} />
            <AvatarFallback className="text-sm font-medium">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold text-sm">{fullName}</div>
            <div className="text-xs text-muted-foreground truncate max-w-[180px]">
              {email}
            </div>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "employeeId",
    header: "Employee ID",
    cell: ({ row }) => {
      const empId = row.original.adminProfile?.employeeId;
      return <div className="font-mono text-sm">{empId || "N/A"}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.roles?.[0]?.role;
      if (!role) return <span className="text-muted-foreground">No role</span>;

      return (
        <Badge
          variant="outline"
          className={`${roleColors[role.name]} font-medium`}
        >
          <Shield className="h-3 w-3 mr-1.5" />
          {getRole(role.name)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      const role = row.original.roles?.[0]?.role?.name;
      return value.includes(role);
    },
  },
  {
    accessorKey: "isLocked",
    header: () => (
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <Lock className="h-4 w-4" />
          <span>Active</span>
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <StatusIcon
        isActive={!row.original.isLocked}
        activeColor="text-green-600"
        inactiveColor="text-red-500"
      />
    ),
  },
  {
    accessorKey: "isBan",
    header: () => (
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <UserX className="h-4 w-4" />
          <span>Banned</span>
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <StatusIcon
        isActive={row.original.isBan}
        activeColor="text-red-600"
        inactiveColor="text-green-600"
      />
    ),
  },
  {
    accessorKey: "joiningDate",
    header: "Joining Date",
    cell: ({ row }) => {
      const rawDate = row.original.adminProfile?.joiningDate;
      return <div className="text-sm">{refactorDate(rawDate || "")}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      // console.log(row.original.id)
      const admin = row.original;

      const toogleBanUser = useToogleBan();
      const toogleLockUser = useToogleLock();
      const { toogleOpen, isEdit, editId } = useInvitationSheet();

      const handleToogleLocked = (userId: string) => {
        toogleLockUser.mutate(
          { userId },
          {
            onSuccess: (res: any) => {
              toast.success(res.message || "✅ Lock status updated.");
            },
            onError: (error: any) => {
              const message =
                error?.response?.data?.message ||
                error?.message ||
                "❌ Failed to toggle lock status.";
              toast.error(message);
            },
          }
        );
      };

      const handleToogleBan = (userId: string) => {
        toogleBanUser.mutate(
          { userId },
          {
            onSuccess: (res: any) => {
              toast.success(res.message || "✅ Ban status updated.");
            },
            onError: (error: any) => {
              const message =
                error?.response?.data?.message ||
                error?.message ||
                "❌ Failed to toggle ban status.";
              toast.error(message);
            },
          }
        );
      };

      const handleViewInvite = (userId: string) => {
        toogleOpen(true, userId);
      };

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-muted"
                aria-label="Open menu"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-semibold">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(admin.id)}
                className="cursor-pointer"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Admin ID
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleViewInvite(row.original.id)}
                className="cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => handleToogleLocked(row.original.id)}
                className="cursor-pointer"
              >
                {admin.isLocked ? (
                  <>
                    <Unlock className="mr-2 h-4 w-4" />
                    Unlock Account
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Lock Account
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleToogleBan(row.original.id)}
                className="cursor-pointer"
              >
                {admin.isBan ? (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Unban User
                  </>
                ) : (
                  <>
                    <UserX className="mr-2 h-4 w-4" />
                    Ban User
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
    size: 60,
  },
];

// Hook for easier usage
export const useAdminColumns = () => {
  return adminColumns;
};
