"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Form,
} from "@workspace/ui/components/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthInput } from "@/components/inputs/auth-input"
import SubmitButton from "@/components/button/submit-button"
import { verificationSchema } from "@/lib/schema/auth.schema"

// Schema for 6-digit OTP and email


type VerificationFormValues = z.infer<typeof verificationSchema>

function EmailVerification() {
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  })

  const onSubmit = (values: VerificationFormValues) => {
    console.log("Verifying OTP for:", values)
    // TODO: Call backend API to verify OTP
  }

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        <CardDescription>
          We've sent a 6-digit code to your email. Enter it below to verify your account.
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
            <AuthInput
              placeholder="123456"
              form={form}
              label="Verification Code (OTP)"
              name="otp"
              type="text"
              description="Enter the 6-digit code sent to your email."
            />
            <SubmitButton isFullWidth title="Verify" disabled={form.formState.isSubmitting} />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {/* Optional: Add resend OTP link */}
      </CardFooter>
    </Card>
  )
}

export default EmailVerification
