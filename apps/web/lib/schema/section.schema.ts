import z from "zod";

export enum SectionType {
  MCQ = "MCQ",
  READING = "READING",
  WRITTING = "WRITTING",
  LISTENING = "LISTENING",
  SPEAKING = "SPEAKING",
  CODEING = "CODEING",
}

export const sectionSchema = z.object({
  // section_id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.string(),
  order: z.string().optional(),
  totalMarks: z.string(),
  isSkipable: z.boolean(),
  isStar: z.boolean().default(false),
  negativeMarks: z.boolean().default(false),
  // totalQuestions: z.number().optional(),
  questionSerialNo: z.enum(["A", "a", "Number", "Roman"]),
  optionSerialNo: z.enum(["A", "a"]),
  sectionType: z.nativeEnum(SectionType).optional().default(SectionType.MCQ),
  // noOfQuestion: z.number().optional(),
});
