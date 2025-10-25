"use client";

import { IInviteWithRole } from "../types/admin.types";
import { useState } from "react";
import { Mail, Shield, Calendar, Clock, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { TabsContent } from "@workspace/ui/components/tabs";
import { InviteRow } from "./invite-table-row";
import useDeleteInvite from "../apis/use-delete-invite";
import useReSentInvitation from "../apis/use-resend-invite-mail";

// Status badge color map

// Format status and calculate remaining time

// Format display date

// Table Row Component

function InvitationContent({ inviteList }: { inviteList: IInviteWithRole[] }) {
  const deleteInvite = useDeleteInvite();
  // const cancelInvite = useReSentInvitation();
  const resendInvite = useReSentInvitation();

  const isLoading = deleteInvite.isPending || resendInvite.isPending;


  const handleResendInvite = (userId: string) => {
    resendInvite.mutate(
      { userId },
      {
        onSuccess: (res: any) => {
          toast(res.message || "✅ Invite resent successfully.");
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "❌ Failed to resend invite.";
          toast(message);
        },
      }
    );
  };

  const handleCancelInvite = (userId: string) => {
    deleteInvite.mutate(
      { userId },
      {
        onSuccess: (res: any) => {
          toast(res.message || "✅ Invite cancelled successfully.");
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "❌ Failed to cancel invite.";
          toast(message);
        },
      }
    );
  };
  const handleEditInvite = (userId: string) => {};
  return (
    <TabsContent value="pending" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
          <CardDescription>
            Track and manage pending admin invitations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Invited By</TableHead>
                <TableHead>Invite Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inviteList.map((invite) => (
                <InviteRow
                  isLoading={isLoading}
                  key={invite.id}
                  invite={invite}
                  onResend={handleResendInvite}
                  onCancel={handleCancelInvite}
                  onEdit={handleEditInvite}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default InvitationContent;
