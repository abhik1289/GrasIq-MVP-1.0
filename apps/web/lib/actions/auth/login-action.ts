// import { actionClient } from "@/lib/safe-action";
// import { loginSchema } from "@repo/utils";
// import { db } from "@workspace/db/src/db";
// import bcrypt from "bcryptjs";

// export const loginUser = actionClient
//   .inputSchema(loginSchema)
//   .action(async ({ parsedInput: { email, password } }) => {
//     const user = await db.user.findUnique({
//       where: {
//         email,
//       },
//     });
//     if (!user) {
//       throw new Error("Invalid email or password");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new Error("Invalid email or password");
//     }

//     // Here you would normally verify the password
//     // For simplicity, we are skipping that step
//     return {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//       image: user.image,
//     };
//   });
