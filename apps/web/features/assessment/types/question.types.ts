import { IOptions } from "@/lib/store/assessment-store/assessment.types";


export type McqQuestionProps = {
  questionId: string;
  title: string;
  options: IOptions[];
  serialCode: string | number;
  optionSerailCode: "A" | "a";
  isLast: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
};

export type OptionItemProps = {
  index: number;
  optionId: string;
  optionText: string;
  optionSerialCode: "A" | "a";
  selectedValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
};