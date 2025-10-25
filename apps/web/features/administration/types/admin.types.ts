// import { invitationSchema } from "@repo/utils";
import { invitationSchema } from "@/lib/schema/auth.schema";
import { z } from "zod";

export interface Role {
  name: string;
}

export interface AdminProfile {
  employeeId: string;
  joiningDate: string; // ISO string
}

export interface IAdmin {
  email: string;
  firstName: string;
  lastName: string;
  isBan: boolean;
  isLocked: boolean;
  lastLogin: string; // ISO string
  roles: Role[];
  adminProfile: AdminProfile;
  id: string;
}
export type AdministrationColumn = {
  id: string;
  fullName: string;
  role: "admin" | "super_admin" | "moderator";
  email: string;
  employeeId: string;
  joiningDate: string;
  isBan: boolean;
  isLocked: boolean;
};

export interface IInviteWithRole {
  email: string;
  id: string;
  firstName: string;
  createdAt: Date; // or Date if you're converting it
  expiredAt: Date; // or Date if you're converting it
  roleId: string;
  status: "PENDING" | "SUCCESSFUL" | "EXPIRED";
  role: {
    name: string;
  };
}

export type RoleTypes = {
  id: string;
  name: string;
};
export type InvitationEditFormProps = {
  editId: string;
  defaultValues: z.infer<typeof invitationSchema>;
};

export type InvitationAddFormProps = {
   defaultValues: z.infer<typeof invitationSchema>;
};

