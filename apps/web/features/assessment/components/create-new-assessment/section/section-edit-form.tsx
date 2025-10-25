import SubmitButton from "@/components/button/submit-button";
import {
  AuthInput,
  InputSelection,
  SwitchField,
  TextAreaInput,
} from "@/components/inputs/auth-input";
import { Form } from "@workspace/ui/components/form";
import { useUpdateSection } from "@/features/assessment/api/use-update-section";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SectionDescriptionTextEditor from "./section-description-text-editor";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

import { useEditor } from "@tiptap/react";
import { sectionSchema } from "@/lib/schema/section.schema";

enum SectionType {
  MCQ = "MCQ",
  READING = "READING",
  WRITTING = "WRITTING",
  LISTENING = "LISTENING",
  SPEAKING = "SPEAKING",
  CODEING = "CODEING",
}
export const sectionTypeOptions = Object.values(SectionType).map((value) => ({
  label: value, // what user sees in dropdown
  name: value, // what you send or store
}));
// export const sectionSchema = z.object({
//   // section_id: z.string(),
//   name: z.string(),
//   description: z.string(),
//   duration: z.string(),
//   order: z.string().optional(),
//   totalMarks: z.string(),
//   isSkipable: z.boolean(),
//   isStar: z.boolean().default(false),
//   negativeMarks: z.boolean().default(false),
//   // totalQuestions: z.number().optional(),
//   questionSerialNo: z.enum(["A", "a", "Number", "Roman"]),
//   optionSerialNo: z.enum(["A", "a"]),
//   sectionType: z.nativeEnum(SectionType).optional().default(SectionType.MCQ),
//   // noOfQuestion: z.number().optional(),
// });

type SectionFormData = z.infer<typeof sectionSchema>;

type SectionEditFormProps = {
  defaultValues?: SectionFormData;
  sectionId: string;
};

function SectionEditForm({ defaultValues, sectionId }: SectionEditFormProps) {
  const form = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema) as any,
    defaultValues,
  });

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      // HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
    ],
    content: defaultValues?.description || "",
    onUpdate: ({ editor }) => {
      form.setValue("description", editor.getHTML());
    },
  });

  const updateSection = useUpdateSection(sectionId);
  // console.log(form.formState.errors);

  console.log(form.formState.errors);
  const onSubmit = (values: SectionFormData) => {
    console.log(values);
    updateSection.mutate(
      {
        sectionType: values.sectionType,
        name: values.name,
        description: values.description,
        duration: values.duration,
        totalMarks: values.totalMarks,
        negativeMarks: values.negativeMarks,
        isSkipable: values.isSkipable,
        isStar: values.isStar,
        optionSerialNo: values.optionSerialNo,
        questionSerialNo: values.questionSerialNo,
      },
      {
        onSuccess: () => {
          toast.success("Section updated successfully");
        },
        onError: (error: any) => {
          toast.error("Section not updated successfully");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" px-3">
        <AuthInput
          form={form}
          disabled={updateSection.isPending}
          name="name"
          label="Section Name"
          type="text"
          placeholder="e.g. Reading Comprehension"
        />
        <SectionDescriptionTextEditor editor={editor} />
        <AuthInput
          form={form}
          disabled={updateSection.isPending}
          name="duration"
          label="Duration (minutes)"
          type="number"
          placeholder="30"
        />

        <AuthInput
          disabled={updateSection.isPending}
          form={form}
          name="totalMarks"
          label="Total Marks"
          type="number"
          placeholder="100"
        />
        {/* 
          <AuthInput
            form={form}
            name="order"
            label="Order in Test"
            type="number"
            placeholder="1"
          /> */}

        <InputSelection
          disabled={updateSection.isPending}
          form={form}
          name="questionSerialNo"
          label="Question Serial Format"
          options={[
            { label: "A", name: "A" },
            { label: "a", name: "a" },
            { label: "Number", name: "Number" },
            { label: "Roman Numeral", name: "Roman" },
            // { label: "Custom", name: "custom" },
          ]}
        />

        <InputSelection
          disabled={updateSection.isPending}
          form={form}
          name="optionSerialNo"
          label="Option Serial Format"
          options={[
            { label: "A", name: "A" },
            { label: "a", name: "a" },
          ]}
        />
        <InputSelection
          disabled={updateSection.isPending}
          form={form}
          name="sectionType"
          label="Section Type"
          options={sectionTypeOptions}
        />

        <SwitchField
          form={form}
          disabled={updateSection.isPending}
          name="isSkipable"
          title="Skippable"
          description="Allow users to skip this section if needed."
        />

        <SwitchField
          form={form}
          disabled={updateSection.isPending}
          name="negativeMarks"
          title="Enable Negative Marks"
          description="Deduct marks for incorrect answers in this section."
        />

        {form.watch("negativeMarks") && (
          <AuthInput
            form={form}
            name="noOfQuestion"
            label="No. of Negatively Marked Questions"
            type="number"
            placeholder="e.g. 5"
            disabled={updateSection.isPending}
          />
        )}

        <SubmitButton
          disabled={updateSection.isPending}
          title="Update Section"
          isFullWidth
        />
      </form>
    </Form>
  );
}

export default SectionEditForm;
