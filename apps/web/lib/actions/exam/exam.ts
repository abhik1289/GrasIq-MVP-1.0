import { actionClient } from "@/lib/safe-action";
// import { db } from "@workspace/db";
import z from "zod";

let db = null;

export const examSchema = z.object({
  name: z.string().min(1),
  examId: z.string().min(10),
});

export const upsertExam = actionClient
  .inputSchema(examSchema)
  .action(async ({ parsedInput: { name, examId } }) => {
    // console.log("THIS IS ACLLING")
    // await db.exam.upsert({
    //   where: { examId },
    //   update: { name },
    //   create: { name, examId, description: "", type: "ASSESSMENT" },
    // });
  });

export const getExams = actionClient.action(async () => {
  // const exams = await db.exam.findMany({
  //   orderBy: { createdAt: "desc" },
  // });
  // return { exam: exams };
  return { exam: [] };
});
