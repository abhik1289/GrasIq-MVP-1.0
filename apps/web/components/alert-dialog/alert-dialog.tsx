import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
// import { Button } from "@/components/ui/button";

type AlertDialogBoxProps = {
  title: string;
  description: string;
  onSuccess: () => void;
  onCancel: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function AlertDialogBox({
  title,
  description,
  onSuccess,
  onCancel,
  open,
  setOpen,
}: AlertDialogBoxProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={onSuccess}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
