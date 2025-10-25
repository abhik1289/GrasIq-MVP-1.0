import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import SectionForm from "@/features/assessment/components/create-new-assessment/section/section-form";
import { useSectionDialog } from "@/lib/store/sheet-store";
type SectionFormDialogProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export function SectionFormDialog({ show, setShow }: SectionFormDialogProps) {

  const {close} = useSectionDialog();

  return (
    <Dialog open={show} onOpenChange={setShow}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger> */}
      <form>
        <DialogContent
          showCloseButton={false}
          className="w-[750px] rounded-2xl max-h-[85vh] overflow-y-auto p-0 scrollbar-hidden border border-slate-100"
        >
          <div className="main_wrapper">
            <DialogHeader className="sticky py-5 top-0 bg-white px-4 border-b border-b-slate-100 z-20">
              <DialogTitle>
                <Breadcrumb className="text-black">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink className="text-black" href="/">
                        Section
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink className="text-black" href="/components">
                        Edit
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {/* <BreadcrumbSeparator /> */}
                  </BreadcrumbList>
                </Breadcrumb>
              </DialogTitle>
              {/* <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription> */}
            </DialogHeader>

            <SectionForm />
          </div>
          <DialogFooter className="sticky bottom-0 bg-slate-50 py-4 border-t border-t-slate-200 px-4">
            <DialogClose asChild>
              <Button onClick={()=>close()} variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
