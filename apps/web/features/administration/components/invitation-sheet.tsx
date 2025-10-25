"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";

import InvitationForm from "./invitation-form";
import { useInvitationSheet } from "@/lib/store/sheet-store";
function InvitationSheet() {
  // const { open, toogleOpen } = useToogleSheet();

  const { open, close } = useInvitationSheet();

  return (
    <Sheet open={open} onOpenChange={() => close()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Send Invitation</SheetTitle>
          <SheetDescription>
            Enter the user details below to send an invitation. You can assign
            roles and permissions before inviting.
          </SheetDescription>
        </SheetHeader>
        <InvitationForm />
      </SheetContent>
    </Sheet>
  );
}

export default InvitationSheet;
