import { zodResolver } from "@hookform/resolvers/zod";
import { mcqSchema } from "@/lib/schema/question.schema";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  AuthInput,
  CustomInputWithSwitch,
  SwitchField,
  TextAreaInput,
} from "@/components/inputs/auth-input";
import { Button } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import { Plus } from "lucide-react";
import SubmitButton from "@/components/button/submit-button";
// import { useCreateAssessmentStore } from "@/store";
import { v4 as uuidv4 } from "uuid";
import { useAddQuestion } from "@/features/assessment/api/use-add-questions";
import { useSearchParams } from "next/navigation";
import QuestionTitleEditor from "./question-title-editor";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Paragraph from "@tiptap/extension-paragraph";
import { toast } from "sonner";
// import Document from "@tiptap/extension-document";
// import Text from "@tiptap/extension-text";

type McqAddFormProps = {
  defaultValues: z.infer<typeof mcqSchema>;
};

function McqAddForm({ defaultValues }: McqAddFormProps) {
  const params = useSearchParams();
  const examId = params.get("examId");
  const sectionId = params.get("sectionId");
  const editor = useEditor({
    immediatelyRender: false,
    // shouldRerenderOnTransaction: false,
    // editorProps: {
    //   attributes: {
    //     autocomplete: "off",
    //     autocorrect: "off",
    //     autocapitalize: "off",
    //     "aria-label": "Main content area, start typing to enter text.",
    //     class: "simple-editor",
    //   },
    // },
    extensions: [
      StarterKit,
      // Document,
      Paragraph,
      // Text,
      Typography,
      Superscript,
      Subscript,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      form.setValue("title", editor.getHTML());
    },
  });

  const question = useAddQuestion(sectionId, examId);
  const form = useForm<z.infer<typeof mcqSchema>>({
    resolver: zodResolver(mcqSchema) as any,
    defaultValues,
  });
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });
  console.log(fields);
  const onSubmit = (value: any) => {
    question.mutate(value, {
      onSuccess: (data) => {
        toast.success("Question added successfully");
      },
      onError: (error: any) => {
        // alert("Question not added successfully");
        toast.error("Question not added successfully");
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" px-3">
        <AuthInput
          label="Question Title"
          form={form}
          name="title"
          type="text"
          placeholder="Question Title"
        />
        {/* <QuestionTitleEditor editor={editor} /> */}
        {/* <label htmlFor="">Options</label> */}
        {form.watch("options") && (
          <div className="mt-1">
            {/* <div className="label">Options</div> */}
            {fields.map((field, index) => (
              <CustomInputWithSwitch
                key={field.id}
                form={form}
                nameForSwitch={`options.${index}.isCorrect`}
                nameForText={`options.${index}.text`}
                onClose={() => remove(index)}
              />
            ))}
          </div>
        )}
        {form.watch("options").length < 4 && (
          <Button
            type="button"
            variant="outline"
            // onClick={() => append({})}
            className="w-full border-dashed bg-transparent my-1.5"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Field
          </Button>
        )}
        <SubmitButton isFullWidth={true} title="Done" />
      </form>
    </Form>
  );
}

export default McqAddForm;
