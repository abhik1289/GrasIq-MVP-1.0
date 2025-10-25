// "use client";

// import React from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useToogleSheet } from "@/store";

// type SheetProviderProps = {
//   title: string;
//   description: string;
//   children: React.ReactNode;
//   side: "top" | "right" | "bottom" | "left" | "custom";
// };

// function SheetProvider() {
//   const { open, toogleOpen, side } = useToogleSheet();

//   return (
//     <Sheet open={open} onOpenChange={() => toogleOpen()}>
//       <SheetContent side={side}>
//         {/* {children} */}
//       </SheetContent>
//     </Sheet>
//   );
// }

// export default SheetProvider;
