import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SubmitButtonProps = {
  title: string;
  style?: string;
  isFullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  style = "",
  isFullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
}) => {
  return (
    <button
    onClick={onClick}
      type="submit"
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium transition hover:bg-primary/90 dark:text-black cursor-pointer",
        isFullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        style
      )}
    >
      {disabled && isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {title}
    </button>
  );
};

export default SubmitButton;
