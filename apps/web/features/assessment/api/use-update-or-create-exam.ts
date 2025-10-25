// import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type examPayload = { examId: string; name: string };

export function useUpdateOrCreateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["exam"],
    mutationFn: async ({ examId, name }: examPayload) => {
      const res = await axios.post(`/api/exam`, { examId, name });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exam"],
      });
    },
  });
}

// export default useDeleteInvite;
