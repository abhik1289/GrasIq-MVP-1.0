"use client";

import SubmitButton from "@/components/button/submit-button";
import { AuthInput, InputSelection } from "@/components/inputs/auth-input";
import { Form } from "@workspace/ui/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invitationSchema } from "@/lib/schema/invitation.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSentInvitation from "../apis/use-sent-invitation";
import { toast } from "sonner";
import useGetRoles from "../apis/use-get-roles";
import { InvitationAddFormProps, RoleTypes } from "../types/admin.types";
// import { InvitationAddForm } from "../types/admin.types";

function InvitationAddForm({ defaultValues }: InvitationAddFormProps) {
  const form = useForm<z.infer<typeof invitationSchema>>({
    resolver: zodResolver(invitationSchema),
    defaultValues,
  });

  const sendInvitation = useSentInvitation();
  const { data: systemRoles, isLoading } = useGetRoles();
  const roleList: RoleTypes[] = (!isLoading && systemRoles.roles) || [];

  function onSubmit(values: z.infer<typeof invitationSchema>) {
    // console.log(values.)
    sendInvitation.mutate(
      {
        email: values.email,
        roleId: values.roleId,
        firstName: values.firstName,
      },
      {
        onSuccess: () => {
          toast("Successfully Login");
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message || "❌ Failed to send invitation.";
          toast.error(message);
        },
      }
    );
  }

  const roles = roleList.map((role) => ({
    label: role.name,
    name: role.id,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-3">
        <AuthInput
          form={form}
          label="First Name"
          name="firstName"
          type={"text"}
          placeholder={"Jhon Doe"}
          disabled={sendInvitation.isPending}
        />
        <AuthInput
          form={form}
          label="Email"
          name="email"
          type={"text"}
          placeholder={"grasiq@gmail.com"}
          disabled={sendInvitation.isPending}
        />
        <InputSelection
          form={form}
          label="Select Role"
          name="roleId"
          options={roles}
          disabled={sendInvitation.isPending}
        />
        <SubmitButton
          disabled={sendInvitation.isPending}
          isFullWidth
          title="Send Invitation"
        />
      </form>
    </Form>
  );
}

export default InvitationAddForm;
