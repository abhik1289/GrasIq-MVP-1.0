import SubmitButton from "@/components/button/submit-button";
import {
  AuthInput,
  CustomInputWithSwitch,
  SwitchField,
  TextAreaInput,
} from "@/components/inputs/auth-input";
import { Button } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mcqSchema } from "@/lib/schema/question.schema";
import { Plus } from "lucide-react";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
// import { useCreateAssessmentStore } from "@/store";
import { v4 as uuidv4 } from "uuid";
import { useUpdateQuestion } from "@/features/assessment/api/use-update-questions";
import { toast } from "sonner";
type McqEditFormProps = {
  defaultValues: z.infer<typeof mcqSchema>;
  questionId: string
};

function McqEditForm({ defaultValues,questionId }: McqEditFormProps) {
  const form = useForm<z.infer<typeof mcqSchema>>({
    resolver: zodResolver(mcqSchema) as any,
    defaultValues,
  });
  // const { addQuestion, activeSectionId, updateQuestion, activeQuestionId } =
  //   useCreateAssessmentStore();
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });
  console.log(fields);
  const updateQuestion = useUpdateQuestion(questionId);
  const onSubmit = (value: z.infer<typeof mcqSchema>) => {
    // console.log(value);
    let mcqqDetail = {
      title: value.title,
      options: value.options,
    }
    updateQuestion.mutate(mcqqDetail,{
      onSuccess: (data) => {
      //  console.log(data); 
      toast.success("Question updated successfully");
      },
      onError: (error: any) => {
        toast.error("Question not updated successfully");
      // alert("Question not updated successfully");
        
      }
    });
  };
  return (
    <ScrollArea>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" px-3">
          <TextAreaInput
            form={form}
            name="title"
            label="Title"
            type="text"
            placeholder={""}
          />
          {/* <label htmlFor="">Options</label> */}
          {form.watch("options") && (
            <div className="mt-1">
              {/* <div className="label">Options</div> */}
              {fields.map((field, index) => (
                <CustomInputWithSwitch
                  key={index}
                  // index={index}
                  // label={`option-${index + 1}`}
                  form={form.control}
                  nameForSwitch={`options.${index}.isCorrect`}
                  nameForText={`options.${index}.text`}
                  // remove={() => remove(index)}
                  // onClose={() => remove(index)}
                />
              ))}
            </div>
          )}
          <Button
            type="button"
            variant="outline"
            // onClick={() => append({})}
            className="w-full border-dashed bg-transparent my-1.5"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Field
          </Button>
          <SubmitButton isFullWidth={true} title="Done" />
        </form>
      </Form>
    </ScrollArea>
  );
}

export default McqEditForm;
