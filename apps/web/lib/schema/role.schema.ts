import { z } from "zod";

export const roleSchema = z.object({
  name: z.enum(["admin", "super_admin", "user", "moderator"]),
});
