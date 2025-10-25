// import { roles } from "@/constants/roles";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(10, "Password must not exceed 10 characters."),
});

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(10, "Password must not exceed 10 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long.")
      .max(10, "Confirm password must not exceed 10 characters."),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "The passwords do not match.",
        code: "custom",
      });
    }
  });

const invitationSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters."),

  email: z
    .string()
    .email("Enter a valid email address (e.g., john@example.com)."),

  roleId: z.string().min(2, "A valid role must be selected."),
});

const setupAccountSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(10, "Password must not exceed 10 characters."),
  confirmPassword: z.string(),
});

const editAdminSchema = z.object({
  isBan: z.boolean().refine((val) => typeof val === "boolean", {
    message: "Ban status must be a valid boolean value.",
  }),
  role: z.string(),
});

const verificationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export {
  loginSchema,
  forgotSchema,
  changePasswordSchema,
  invitationSchema,
  setupAccountSchema,
  editAdminSchema,
  verificationSchema,
};

//demo
