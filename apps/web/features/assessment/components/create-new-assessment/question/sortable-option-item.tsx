// "use client";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import React from "react";
// import { McqQuestionProps } from "./mcq-question";
// import McqQuestion from "./mcq-question";
// import OptionItem, { OptionItemProps } from "./option-item";

// type SortableOptionItemProps = OptionItemProps & {
//   id: string;
// };

// export function SortableQuestionItem(props: SortableOptionItemProps) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: props.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style}>
//       {/* <OptionItem
//         {...props}
//         dragHandleProps={{ ...attributes, ...listeners }}
//       /> */}
//     </div>
//   );
// }
