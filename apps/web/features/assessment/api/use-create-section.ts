// import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type SectionPayload = {
  // sectionId: string;
  // name: string;
  examId: string;
  description?: string;
  order?: number;
  durationInMin?: number;
  marks?: number;
  noOfQna?: number;
  isSkipable?: boolean;
  isStar?: boolean;
};

export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["sections"],
    mutationFn: async (data: SectionPayload) => {
      const res = await axios.post(`/api/section`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
}
