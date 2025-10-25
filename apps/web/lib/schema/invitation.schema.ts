import { z } from "zod";

const invitationSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  firstName: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(10, "Password must not exceed 10 characters."),
  roleId: z.string().min(4).max(25),
});
export { invitationSchema };
