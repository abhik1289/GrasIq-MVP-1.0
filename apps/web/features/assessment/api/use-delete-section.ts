// import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";
import { sectionSchema } from "@/lib/schema/section.schema";

export type SectionPayload = z.infer<typeof sectionSchema>

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["sections"],
    mutationFn: async ({ sectionId }:{
      sectionId: string
    }) => {
      const res = await axios.delete(`/api/section/${sectionId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
}
