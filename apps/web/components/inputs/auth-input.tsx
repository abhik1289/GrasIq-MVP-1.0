
"use client";

import { Input } from "@workspace/ui/components/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { useState } from "react";
import { Eye, EyeOff, GripVertical, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import RichTextEditor from "@/features/assessment/components/create-new-assessment/section/text-editor";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { cn } from "@workspace/ui/lib/utils";



type AuthInputProps = {
  form: any;
  name: string;
  description?: string;
  label: string;
  disabled?: boolean;
  type:"text" | "password"| "email" | "number";
  placeholder?: string;
}


export function AuthInput({
  form,
  description,
  label,
  name,
  type,
  placeholder,
  disabled,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPassword = type === "password";

  return (
    <div className="w-full my-2.5">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="">{label}</FormLabel>
            <FormControl>
              <div className="relative w-full">
                <Input
                  disabled={disabled}
                  type={
                    isPassword ? (showPassword ? "text" : "password") : type
                  }
                  placeholder={placeholder}
                  {...field}
                  className="pr-10"
                />
                {isPassword && (
                  <div
                    // type="button"
                    // variant="ghost"
                    // size="icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 bottom-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </div>
                )}
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}


type AuthSelectProps = Pick<AuthInputProps, "form" | "name" | "label" | "disabled"> & {
  options: { name: string; label: string }[];
}

export function InputSelection({
  form,
  name,
  label,
  options,
  disabled,
}: AuthSelectProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="my-0.5">{label}</FormLabel>
          <FormControl>
            <div className="relative w-full mb-1.5">
              <Select
                disabled={disabled}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.name} value={option.name}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          {/* {description && <FormDescription>{description}</FormDescription>} */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TextAreaInput({ form, name, label, disabled }: AuthInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="my-2">{label}</FormLabel>
          <FormControl>
            <div className="relative w-full">
              <Textarea disabled={disabled} {...field} />
            </div>
          </FormControl>
          {/* {description && <FormDescription>{description}</FormDescription>} */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function RichText({}) {
  return <RichTextEditor />;
}
interface SwitchFieldProps {
  title: string;
  description?: string;
  form: any;
  name: string;
  disabled?: boolean;
}
export const SwitchField: React.FC<SwitchFieldProps> = ({
  form,
  title,
  description,
  name,
  disabled,
}: SwitchFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full my-2">
          <div className="space-y-0.5">
            <FormLabel>{title}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch
              disabled={disabled}
              checked={field.value}
              className=""
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

// export const OptionField : React.FC<>()

// type SelectInputWithSearchFieldProps = {
//   name: string;
//   control: any;
//   label?: string;
//   placeholder?: string;
//   options: { name: string; id: string }[];
// };

// interface CustomInputWithSwitchProps {
//   form: any;
//   name: string;
//   label?: string;
//   disabled?: boolean;
//   placeholder?: string;
//   switchValue?: boolean;
//   onSwitchChange?: (checked: boolean) => void;
//   className?: string;
//   showDragIcon?: boolean;
//   inputText: string;
// }
interface CustomInputWithSwitchProps {
  form: any;
  nameForText: string;
  nameForSwitch: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  showDragIcon?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export function CustomInputWithSwitch({
  form,
  nameForText,
  nameForSwitch,
  label,
  disabled = false,
  placeholder = "Enter option...",
  className,
  showDragIcon = true,
  showCloseButton = true,
  onClose,
}: CustomInputWithSwitchProps) {
  return (
    <div className={cn("w-full my-2", className)}>
      {label && <FormLabel className="mb-1 block">{label}</FormLabel>}

      <div className="relative flex items-center">
        {/* Text Field */}
        <FormField
          control={form.control}
          name={nameForText}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  {showDragIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 cursor-grab active:cursor-grabbing">
                      <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                    </div>
                  )}
                  <Input
                    {...field}
                    disabled={disabled}
                    placeholder={placeholder}
                    type="text"
                    className={cn(
                      "h-12 rounded-xl border-0 outline-none ring-0 focus:ring-0 bg-gray-50/50 text-gray-900 placeholder:text-gray-500",
                      showDragIcon ? "pl-10 pr-16" : "pr-16",
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Right Side: Close + Switch */}
        <FormField
          control={form.control}
          name={nameForSwitch}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={disabled}
                      className="h-6 w-6 p-0 flex items-center justify-center rounded hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={disabled}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}