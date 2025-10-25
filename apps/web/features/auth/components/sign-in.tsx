"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import React from "react";
import { Form } from "@workspace/ui/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthInput } from "@/components/inputs/auth-input";
import SubmitButton from "@/components/button/submit-button";
import { loginSchema } from "@/lib/schema/auth.schema";
import { useSignIn } from "../apis/use-sign-in";
import { useRouter } from "next/navigation";
// import { useUserData } from "@/store";
import { useAuthToken } from "@/lib/store/useAuthToken";
import { z } from "zod";
import { signIn } from "next-auth/react";

function SignIn() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useSignIn();
  const router = useRouter();
  // const { signIn } = useUserData();
  const { setToken } = useAuthToken();

  function onSubmit(values: z.infer<typeof loginSchema>) {
    signIn("credentials", {
      email: values.email,
      password: values.password,
    });
  }
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back 👋</CardTitle>
        <CardDescription className="text-muted-foreground">
          Unlock your personalized dashboard by signing in with your
          credentials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AuthInput
              placeholder="you@example.com"
              form={form}
              label="Email"
              name="email"
              type="text"
              disabled={signInMutation.isPending}
            />
            <AuthInput
              placeholder="••••••••"
              form={form}
              label="Password"
              name="password"
              type="password"
              disabled={signInMutation.isPending}
            />
            <SubmitButton
              disabled={signInMutation.isPending}
              isFullWidth
              title="Sign in"
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default SignIn;
