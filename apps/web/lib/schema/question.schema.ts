// import { z } from "zod";

// // const questionSchema = z.object({
// //   title: z.string().min(5).max(110),
// //   type: z.enum([
// //     "MCQ",
// //     "READING",
// //     "WRITTING",
// //     "CODING",
// //     "SPEAKING",
// //     "LISTENING",
// //   ]),
// //   // option:
// // });

// // const mcqOptions = z.object({
// //   option: z
// //     .array(
// //       z.object({ text: z.string(), isCorrect: z.boolean().default(false) })
// //     )
// //     .optional(),
// // });

// // const reading = z.object({
// //   readingText: z.string().min(150).max(600),
// // });

// // const writting = z.object({
// //   text: z.string().min(15).max(25),
// // });

// // const coding = z.object({
// //   description: z.string().min(10).max(60),
// //   example: z.array(
// //     z.object({
// //       input: z.string().min(5).max(15),
// //       output: z.string().min(5).max(10),
// //       explanation: z.string().optional(),
// //       imputImage: z.string().optional(),
// //       outputImage: z.string().optional(),
// //     })
// //   ),
// // });

// // export default questionSchema;

// const baseSchema = z.object({
//   title: z.string().min(5).max(110),
// });

// const mcqSchema = z.object({
//   type: z.literal("MCQ"),
//   options: z.array(
//     z.object({
//       text: z.string(),
//       isCorrect: z.boolean().default(false),
//     })
//   ),
// });
// const readingSchema = baseSchema.extend({
//   type: z.literal("READING"),
//   readingText: z.string().min(150).max(600),
// });
// const writtingSchema = baseSchema.extend({
//   type: z.literal("WRITTING"),
//   questionText: z.string().min(15).max(25),
// });
// const codingSchema = baseSchema.extend({
//   type: z.literal("CODING"),
//   description: z.string().min(10).max(60),
//   example: z.array(
//     z.object({
//       input: z.string().min(5).max(15),
//       output: z.string().min(5).max(10),
//       explanation: z.string().optional(),
//       imputImage: z.string().optional(),
//       outputImage: z.string().optional(),
//     })
//   ),
//   constrant: z.array(z.object({ text: z.string().max(30) })),
// });
// const speakingSchema = baseSchema.extend({
//   type: z.literal("SPEAKING"),
//   prompt: z.string().min(10).max(100),
// });

// // LISTENING Schema
// const listeningSchema = baseSchema.extend({
//   type: z.literal("LISTENING"),
//   audioUrl: z.string().url(),
// });

// const questionSchema = z.discriminatedUnion("type", [
//   mcqSchema,
//   readingSchema,
//   writtingSchema,
//   codingSchema,
//   speakingSchema,
//   listeningSchema,
// ]);
// export { questionSchema };

import { z } from "zod";

const mcqSchema = z.object({
  type: z.literal("MCQ"),
  title: z.string().min(5).max(110),
  options: z.array(
    z.object({
      text: z.string(),
      isCorrect: z.boolean().default(false),
    })
  ),
});
export { mcqSchema };
