// import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";
import { sectionSchema } from "@/lib/schema/section.schema";
export type SectionPayload = z.infer<typeof sectionSchema>

export function useUpdateSection(sectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["sections"],
    mutationFn: async (data: SectionPayload) => {
      const res = await axios.put(`/api/section/${sectionId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
}
