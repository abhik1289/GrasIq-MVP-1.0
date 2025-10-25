"use client";

import { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";

import { UserCheck, Clock, Plus } from "lucide-react";
import { toast } from "sonner";
import InvitationContent from "./invitation-content";
import AdminContent from "./admin-content";
// import { useToogleSheet } from "@/store";
import InvitationSheet from "./invitation-sheet";
import { IAdmin, IInviteWithRole } from "../types/admin.types";
import useGetAdmininstrationList from "../apis/use-administration-lists";
import { useInvitationSheet } from "@/lib/store/sheet-store";

const roleColors = {
  "Super Admin": "bg-red-100 text-red-800 border-red-200",
  Admin: "bg-blue-100 text-blue-800 border-blue-200",
  Moderator: "bg-green-100 text-green-800 border-green-200",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  expired: "bg-red-100 text-red-800 border-red-200",
  active: "bg-green-100 text-green-800 border-green-200",
};

export default function AdminManagement() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const { toogleOpen } = useInvitationSheet();
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "",
  });

  const handleSendInvite = () => {
    if (!inviteForm.email || !inviteForm.role) {
      // toast({
      //   title: "Error",
      //   description: "Please fill in all required fields.",
      //   variant: "destructive",
      // })
      return;
    }

    // Here you would typically send the invite to your backend
    // toast({
    //   title: "Invite Sent",
    //   description: `Admin invitation sent to ${inviteForm.email}`,
    // })

    setInviteForm({ email: "", role: "" });
    setIsInviteDialogOpen(false);
  };
  const adminData = useGetAdmininstrationList();
  console.log(adminData.data);
  if (adminData.isLoading) {
    return <div>Loading</div>;
  }
  const adminList: IAdmin[] = adminData.data.administrationList || [];
  console.log(adminList);
  const inviteList: IInviteWithRole[] = adminData.data.invitationList || [];
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Management
          </h1>
          <p className="text-muted-foreground">
            Manage administrators and pending invitations
          </p>
        </div>
        {/* <Button variant="outline" size="icon" className="ml-auto">
          <AlignRight />
        </Button> */}
        <Button onClick={() => toogleOpen()} className="gap-2">
          <Plus className="h-4 w-4" />
          Send Invite
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="gap-2">
            <UserCheck className="h-4 w-4" />
            Active Admins ({adminList.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending Invites ({inviteList.length})
          </TabsTrigger>
        </TabsList>

        <AdminContent adminList={adminList} />
        <InvitationContent inviteList={inviteList} />
      </Tabs>
      <InvitationSheet />
    </div>
  );
}
