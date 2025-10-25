// import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type examPayload = { examId: string; name: string };

export function useAddQuestion(sectionId,examId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["questions"],
    mutationFn: async (data) => {
      const res = await axios.post(`/api/question/mcq/${sectionId}/${examId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
  });
}

// export default useDeleteInvite;
