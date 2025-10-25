// import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type examPayload = { examId: string; name: string };

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["questions"],
    mutationFn: async (questionId:string) => {
      const res = await axios.delete(`/api/question/${questionId}`);
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
