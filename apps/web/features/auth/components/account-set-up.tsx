"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Form } from "@workspace/ui/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthInput } from "@/components/inputs/auth-input";
import SubmitButton from "@/components/button/submit-button";
import { z } from "zod";
import { setupAccountSchema } from "@/lib/schema/auth.schema";
// import { setupAccountSchema } from "@repo/utils";

type AccountSetupValues = z.infer<typeof setupAccountSchema>;

function AccountSetup() {
  const form = useForm<AccountSetupValues>({
    resolver: zodResolver(setupAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: AccountSetupValues) => {
    console.log("Submitted values:", values);
    // Call API or handle form submission
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Set up your account to access all features and get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="row flex gap-2">
              <AuthInput
                placeholder="John"
                form={form}
                label="First Name"
                name="firstName"
                type="text"
              />
              <AuthInput
                placeholder="Doe"
                form={form}
                label="Last Name"
                name="lastName"
                type="text"
              />
            </div>
            <AuthInput
              placeholder="••••••••"
              form={form}
              label="Password"
              name="password"
              type="password"
            />
            <AuthInput
              placeholder="••••••••"
              form={form}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <SubmitButton isFullWidth title="Set Up Account" />
          </form>
        </Form>
      </CardContent>
      <CardFooter>{/* Optional footer content */}</CardFooter>
    </Card>
  );
}

export default AccountSetup;
