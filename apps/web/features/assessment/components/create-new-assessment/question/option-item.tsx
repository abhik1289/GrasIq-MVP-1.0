import React from "react";
import { RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Label } from "@workspace/ui/components/label";
import useGetSerialCode from "@/features/assessment/hooks/use-get-serial-code";
import { cn } from "@workspace/ui/lib/utils";
import { OptionItemProps } from "@/features/assessment/types/question.types";



const OptionItem: React.FC<OptionItemProps> = ({
  index,
  optionId,
  optionText,
  optionSerialCode,
  selectedValue,
  onChange,
  disabled = false,
  className,
//   dragHandleProps,
}) => {
  const serial = useGetSerialCode(optionSerialCode, index);

  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg shadow-sm",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-100",
        className
      )}
    >
      <RadioGroupItem value={optionId} id={optionId} />
      <Label
        htmlFor={optionId}
        className="flex gap-1 items-center text-gray-800"
      >
        <span className="font-semibold text-gray-600">{serial})</span>
        <span>{optionText}</span>
      </Label>
    </div>
  );
};

export default OptionItem;
