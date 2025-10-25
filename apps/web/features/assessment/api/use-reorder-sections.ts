// import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";
import { sectionSchema } from "@/lib/schema/section.schema";

export type SectionPayload = z.infer<typeof sectionSchema>;

export function useResorderSections() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["sections_reorder"],
    mutationFn: async ({
      sections,
    }: {
      sections: { id: string; order: number }[];
    }) => {
      const res = await axios.put(`/api/exam/sections/reorder`, { sections });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
}
