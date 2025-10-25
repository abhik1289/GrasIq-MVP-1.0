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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthInput } from "@/components/inputs/auth-input";
import SubmitButton from "@/components/button/submit-button";
import { forgotSchema as forgotPasswordSchema } from "@/lib/schema/auth.schema";

// Schema

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

function ForgotPassword() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    console.log("Forgot password email submitted:", values.email);
    // TODO: Call API to trigger password reset
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Your Password?</CardTitle>
        <CardDescription>
          Enter your email and we'll send you instructions to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AuthInput
              placeholder="you@example.com"
              form={form}
              label="Email Address"
              name="email"
              type="text"
            />
            <SubmitButton
              isFullWidth
              title="Send Reset Link"
              disabled={form.formState.isSubmitting}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>{/* Optional: Link to go back to login */}</CardFooter>
    </Card>
  );
}

export default ForgotPassword;
