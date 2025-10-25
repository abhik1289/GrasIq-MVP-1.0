"use client";

import React, { useEffect, useState } from "react";
import SectionList from "./section-list";
import { ISection } from "@/features/assessment/types/section.types";
import { useGetSections } from "@/features/assessment/api/use-get-sections";
import { useSearchParams } from "next/navigation";
import { AlertDialogBox } from "@/components/alert-dialog/alert-dialog";
import { useDeleteSection } from "@/features/assessment/api/use-delete-section";
// import { useReorderSections } from "@/features/assessment/api/use-reorder-sections";
import { toast } from "sonner";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useResorderSections } from "@/features/assessment/api/use-reorder-sections";
import SubmitButton from "@/components/button/submit-button";

function SectionListView() {
  const examId = useSearchParams().get("examId") ?? undefined;
  const section = useGetSections(examId || "");

  const [open, setOpen] = useState(false);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [items, setItems] = useState<ISection[]>([]);
  const [dirty, setDirty] = useState(false); // track if order changed

  const deleteSection = useDeleteSection();
  const reorderSections = useResorderSections();

  useEffect(() => {
    if (section.data?.sections) {
      setItems(section.data.sections);
      setDirty(false);
    }
  }, [section.data?.sections]);

  const onDelete = (id: string) => {
    setSectionId(id);
    setOpen(true);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(items, oldIndex, newIndex);
    const reordered = newItems.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setItems(reordered);
    setDirty(true); // mark unsaved
  };

  const handleSave = () => {
    if (!examId) return;

    const modifedItems = items.map((i, index) => ({
      id: i.id,
      order: index + 1,
    }));

    reorderSections.mutate(
      { sections: modifedItems },
      {
        onSuccess: () => {
          toast.success("Order saved successfully!");
          setDirty(false);
        },
        onError: () => {
          toast.error("Failed to save order");
        },
      }
    );
  };

  if (section.isLoading) return <div>Loading...</div>;
  if (section.isError) return <div>Error loading sections</div>;

  return (
    <div className="relative overflow-x-hidden">
      <div className="heading my-4 flex justify-between items-center ">
        <h2>Sections List</h2>
      </div>
      {/* {dirty && ( */}

      {/* // )} */}
      {/* Delete Confirmation Dialog */}
      <AlertDialogBox
        description="Are you sure you want to delete this section? This action cannot be undone."
        title="Delete Section"
        open={open}
        setOpen={setOpen}
        onCancel={() => setOpen(false)}
        onSuccess={() => {
          if (!sectionId) return;
          deleteSection.mutate(
            { sectionId },
            {
              onSuccess: () => {
                toast.success("Section Deleted Successfully");
                setOpen(false);
              },
              onError: () => {
                toast.error("Section not deleted successfully");
                setOpen(false);
              },
            }
          );
        }}
      />

      {/* Drag and Drop Context */}
      <div className="drag_and_drop_box px-2">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map((i) => i.id)}>
            {items.map((item, index) => (
              <SectionList
                order={item.order ?? 0}
                key={item.id}
                id={item.id}
                name={item.name}
                durationInMin={item.durationInMin ?? "0"}
                totalMarks={item.totalMarks ?? "0"}
                _count={{ Question: item._count?.Question ?? 0 }}
                index={index}
                handleDelete={onDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div
        style={{ bottom: 0, height: "65px", background: "white", zIndex: 1000 }}
        className="sticky bottom-0 w-full bg-white  p-4 flex justify-end gap-4"
      >
        <SubmitButton
          disabled={!dirty || reorderSections.isPending}
          title="Save Order"
          isFullWidth={true}
          isLoading={reorderSections.isPending}
          // on
          onClick={handleSave}
          // disabled={reorderSections.isPending}
          // className="px-4 py-2 bg-blue-600 text-white rounded-md"
        />
        {/* {reorderSections.isPending ? "Saving..." : "Save Order"}
        </SubmitButton> */}
      </div>
    </div>
  );
}

export default SectionListView;
