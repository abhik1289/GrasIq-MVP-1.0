// import { useToogleSheet } from "@/store";
import { useInvitationSheet } from "@/lib/store/sheet-store";
import React from "react";
import InvitationEditForm from "./invitation-edit-form";
import InvitationAddForm from "./invitation-add-form";
import useGetInviteById from "../apis/use-get-user";

function InvitationForm() {
  const { isEdit, editId } = useInvitationSheet();
  const {
    data: userData,
    isError,
    error,
    isLoading,
  } = useGetInviteById(editId || "");
  console.log(isLoading, isEdit, isError, userData);
  return (
    <>
      {isEdit && editId ? (
        <InvitationEditForm
          defaultValues={{ email: "", firstName: "", roleId: "" }}
          editId=""
        />
      ) : (
        <InvitationAddForm
          defaultValues={{ email: "", firstName: "", roleId: "" }}
        />
      )}
    </>
  );
}

export default InvitationForm;
